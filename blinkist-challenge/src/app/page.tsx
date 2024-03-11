"use client"
import React from "react"
import ABTestManager, { ABTestContext } from "./components/ABTestManager"
import SignupButton from "./components/SignupButton"
import ArticleContent from "./components/ArticleContent"

const HomePage = () => {
  return (
    <ABTestManager>
      <div>
        <h1>AB Testing Demo</h1>
        <ArticleContent></ArticleContent>
        <ABTestContext.Consumer>
          {({ assignedVariation }) => (
            <SignupButton variation={assignedVariation}></SignupButton>
          )}
        </ABTestContext.Consumer>
      </div>
    </ABTestManager>
  )
}

export default HomePage
