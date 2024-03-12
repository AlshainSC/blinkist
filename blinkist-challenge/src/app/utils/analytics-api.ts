import { getClickData } from "./utils"

/**
 * Tracks a pageview to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL is probably a good start though.
 */
export const trackPageview = (params: any) => {
  console.log(`--> Tracking Pageview: `, params)
}

/**
 * Tracks an event to our "imaginary api" - in this demo just the browser console. ;)
 * Send as params whatever you might seem valuable to send.
 * The URL and an event name are probably a good start though.
 */
export const trackEvent = (params: any) => {
  console.log(`--> Tracking Event: `, params)
}

const calculateCTR = (variation: any) => {
  const clickData = getClickData()
  let uniqueClicks = 0
  let totalClicks = 0

  for (const [key, count] of Object.entries(clickData)) {
    if (key.endsWith(`-${variation}`)) {
      uniqueClicks++
      totalClicks += count as number
    }
  }

  return totalClicks > 0 ? uniqueClicks / totalClicks : 0
}
