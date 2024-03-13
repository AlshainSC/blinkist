import React, { useState, useEffect, useContext, ReactNode } from "react"
import { ContentBlock, ArticleData, Article } from "../utils/types"
import jsonData from "../data/content.json"
import { ABTestContext } from "../utils/utils"

const ArticleContent: React.FC = () => {
  const [articleData, setArticleData] = useState<ArticleData | null>(null)
  const [textBlock, setTextBlock] = useState<ReactNode | null>(null)
  const [imageBlock, setImageBlock] = useState<ReactNode | null>(null)
  const [videoBlock, setVideoBlock] = useState<ReactNode | null>(null)
  const { assignedVariation } = useContext(ABTestContext)
  const currentVariation = articleData?.variations.find(
    (v) => v.id === assignedVariation
  )
  const contentBlockComponents: Article = {
    text: ({ content }: ContentBlock) => (
      <h2 className="text-xl font-medium mb-3">{content}</h2>
    ),
    image: ({ content }: ContentBlock) => (
      <img className="mb-4 w-1/2 h-auto flex-1" src={content} alt="article" />
    ),
    video: ({ content }: ContentBlock) => (
      <iframe
        title="Article Video"
        width={560}
        height={315}
        className="w-1/2 h-auto flex-1"
        src={content}
        allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture;"
      />
    )
  }

  useEffect(() => {
    if (currentVariation) {
      const contentBlocks = currentVariation.content
      const text = contentBlocks.find((block) => block.type === "text")
      const image = contentBlocks.find((block) => block.type === "image")
      const video = contentBlocks.find((block) => block.type === "video")
      setTextBlock(text ? contentBlockComponents["text"](text) : null)
      setImageBlock(image ? contentBlockComponents["image"](image) : null)
      setVideoBlock(video ? contentBlockComponents["video"](video) : null)
    }
    return setArticleData(jsonData)
  }, [currentVariation])

  if (!articleData || !assignedVariation) {
    return <div>Loading...</div>
  }
  return (
    <div className="container mx-auto p-4">
      <h2>{articleData.title}</h2>
      <div>
        {textBlock}
        <div className="flex flex-row">
          {imageBlock}
          {videoBlock}
        </div>
      </div>
    </div>
  )
}

export default ArticleContent
