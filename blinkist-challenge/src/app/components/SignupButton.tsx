import React, { useContext } from "react"
import { SignupButtonProps } from "../utils/types"
import { trackEvent } from "../utils/analytics-api"
import { ABTestContext } from "./ABTestManager"
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

  return <button onClick={handleClick}>Sign Up</button>
}

export default SignupButton
