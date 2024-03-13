export const LOCAL_STORAGE_KEY = "ABTestMetrics"

import { VariationContextData } from "../utils/types"
import { createContext, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { trackPageview } from "./analytics-api"
import { PageviewEvent } from "./types"

export const getVisitorId = () => {
  const existingVisitorId = localStorage.getItem("visitorId")
  if (existingVisitorId) {
    return existingVisitorId
  } else {
    const newVisitorId = uuidv4()
    localStorage.setItem("visitorId", newVisitorId)
    return newVisitorId
  }
}

export const getClickData = () => {
  const existingData = localStorage.getItem(LOCAL_STORAGE_KEY)
  return existingData ? JSON.parse(existingData) : {}
}

export const incrementClickCount = (visitorId: string, variation: string) => {
  const clickData = getClickData()
  const key = `${visitorId}-${variation}`

  clickData[key] = {
    count: (clickData[key]?.count || 0) + 1,
    timestamp: Date.now()
  }
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clickData))
}

export const calculatePartialCTR = (variation: string, timeWindow: number) => {
  const clickData = getClickData()
  const now = Date.now()

  let uniqueClicks = 0
  let totalClicks = 0

  for (const [key, data] of Object.entries(clickData)) {
    if (
      key.endsWith(`-${variation}`) &&
      now - (data as { count: number; timestamp: number }).timestamp <
        timeWindow
    ) {
      uniqueClicks++
      totalClicks += (data as { count: number }).count
    }
  }

  return totalClicks > 0 ? uniqueClicks / totalClicks : 0
}

const determineVariation = (visitorId: string) => {
  // Hash for consistent variation assignment
  let hash = 0
  for (let i = 0; i < visitorId.length; i++) {
    hash = (hash << 5) - hash + visitorId.charCodeAt(i)
    hash |= 0 // Convert to 32bit integer
  }
  return hash % 2 === 0 ? "A" : "B"
}

//custom hooks
export const ABTestContext = createContext<VariationContextData>({
  assignedVariation: null
})

export const useVisitorId = () => {
  const [visitorId, setVisitorId] = useState<null | string>(null)

  useEffect(() => {
    const storedId = localStorage.getItem("visitorId")
    if (storedId) {
      setVisitorId(storedId)
    } else {
      const newId = getVisitorId()
      setVisitorId(newId)
      localStorage.setItem("visitorId", newId)
    }
  }, [])

  return visitorId
}

//rename to consider pageview
export const useAssignedVariation = (visitorId: string | null) => {
  const [assignedVariation, setAssignedVariation] = useState<string>("")

  useEffect(() => {
    if (visitorId) {
      const variation = determineVariation(visitorId)
      setAssignedVariation(variation)
      trackPageview({ url: window.location.href, variation, visitorId })
    }
  }, [visitorId])
  return assignedVariation
}

export const useLocalStorage = (key: string, value: string) => {
  const [storedValue, setStoredValue] = useState<string | null>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : value
    } catch (err) {
      console.error(err)
      return value
    }
  })
  const setValue = (value: string) => {
    try {
      setStoredValue(value)
      localStorage
    } catch (err) {
      console.error(err)
    }
  }
  return [storedValue, setValue]
}
