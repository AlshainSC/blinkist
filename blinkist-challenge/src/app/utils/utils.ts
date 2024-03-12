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

  clickData[key] = (clickData[key] || 0) + 1
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(clickData))
}
