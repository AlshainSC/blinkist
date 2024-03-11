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
