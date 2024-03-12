export const LOCAL_STORAGE_KEY = "ABTestMetrics"

import { v4 as uuidv4 } from "uuid"

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
