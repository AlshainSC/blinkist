"use client"
import React from "react"
import ABTestManager, { ABTestContext } from "./components/ABTestManager"
import SignupButton from "./components/SignupButton"
import ArticleContent from "./components/ArticleContent"
import CTRDisplay from "./components/CTRDisplay"

const HomePage = () => {
  return (
    <ABTestManager>
      <div className="flex flex-row content-center justify-center m-3">
        <div className="m-3">
          <h1>AB Testing Demo</h1>
          <ArticleContent></ArticleContent>
          <ABTestContext.Consumer>
            {({ assignedVariation }) => (
              <SignupButton variation={assignedVariation}></SignupButton>
            )}
          </ABTestContext.Consumer>
        </div>
        <div className="m-3">
          <CTRDisplay />
        </div>
      </div>
    </ABTestManager>
  )
}

export default HomePage
