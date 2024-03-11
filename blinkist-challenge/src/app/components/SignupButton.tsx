import React from "react"
import { SignupButtonProps } from "../utils/types"
import { trackEvent } from "../utils/analytics-api"

const SignupButton: React.FC<SignupButtonProps> = ({ variation }) => {
  const handleClick = () => {
    trackEvent({
      event: "Signup Clicked",
      url: window.location.href,
      variation
    })
    console.log("signup clicked")
    localStorage.clear()
  }

  return <button onClick={handleClick}>Sign Up</button>
}

export default SignupButton
