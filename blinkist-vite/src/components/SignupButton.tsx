import React from "react"
import { SignupButtonProps } from "../utils/types"
import { trackEvent } from "../utils/analytics-api"
import { getVisitorId, incrementClickCount } from "../utils/utils"

const SignupButton: React.FC<SignupButtonProps> = ({ variation }) => {
  const handleClick = () => {
    const visitorId = getVisitorId()

    if (variation && visitorId) {
      incrementClickCount(visitorId, variation)
    }

    trackEvent({
      event: "Signup Clicked",
      url: window.location.href,
      variation
    })
  }

  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded mt-4"
      onClick={handleClick}
    >
      Sign Up
    </button>
  )
}

export default SignupButton
