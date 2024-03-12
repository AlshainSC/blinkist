"use client"
import React, { useState, useEffect, useContext } from "react"
import { ABTestContext } from "./ABTestManager"
import { ContentBlock, ArticleData } from "../utils/types"

const ArticleContent: React.FC = () => {
  const [articleData, setArticleData] = useState<ArticleData | null>(null)
  const { assignedVariation } = useContext(ABTestContext)

  useEffect(() => {
    const jsonData = require("../data/content.json")
    setArticleData(jsonData)
  }, [])

  const renderContentBlock = (block: ContentBlock) => {
    switch (block.type) {
      case "text":
        return <p>{block.content}</p>
      case "image":
        return <p>{block.content}</p>
      case "video":
        return <p>{block.content}</p>
      default:
        return null
    }
  }

  if (!articleData || !assignedVariation) {
    return <div>Loading...</div>
  }

  const currentVariation = articleData.variations.find(
    (v) => v.id === assignedVariation
  )

  return (
    <div>
      <h2>{articleData.title}</h2>
      {currentVariation?.content.map(
        (block: ContentBlock, index: React.Key | null | undefined) => (
          <div key={index}>{renderContentBlock(block)}</div>
        )
      )}
    </div>
  )
}

export default ArticleContent
