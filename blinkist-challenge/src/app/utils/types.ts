// Variations
export interface VariationContextData {
  assignedVariation: string | null
}

// Signup
export interface SignupButtonProps {
  variation: string | null
}

// Article
export interface ContentBlock {
  type: "text" | "image" | "video"
  content: string
}

export interface ArticleData {
  title: string
  variations: {
    id: string
    content: ContentBlock[]
  }[]
}
