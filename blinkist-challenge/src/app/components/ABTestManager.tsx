"use client"
import React, { useState, useEffect, createContext } from "react"
import { getVisitorId } from "../utils/utils"
import { VariationContextData } from "../utils/types"
import { trackPageview } from "../utils/analytics-api"

export const ABTestContext = createContext<VariationContextData>({
  assignedVariation: null
})

const ABTestManager: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  const [visitorId, setVisitorId] = useState<string | null>(null)
  const [assignedVariation, setAssignedVariation] = useState<string | null>(
    null
  )

  useEffect(() => {
    const id = getVisitorId()
    setVisitorId(id)
    setAssignedVariation(determineVariation(id))
  }, [])

  useEffect(() => {
    if (assignedVariation) {
      trackPageview({
        url: window.location.href,
        variation: assignedVariation,
        visitorId
      })
    }
  }, [assignedVariation])

  const determineVariation = (visitorId: string) => {
    // Hash for consistent variation assignment
    let hash = 0
    for (let i = 0; i < visitorId.length; i++) {
      hash = (hash << 5) - hash + visitorId.charCodeAt(i)
      hash |= 0 // Convert to 32bit integer
    }
    return hash % 2 === 0 ? "A" : "B"
  }

  useEffect(() => {
    if (assignedVariation) {
      localStorage.setItem("assignedVariation", assignedVariation)
    }
  }, [assignedVariation, visitorId])

  return (
    <ABTestContext.Provider value={{ assignedVariation }}>
      {children}
    </ABTestContext.Provider>
  )
}

export default ABTestManager
