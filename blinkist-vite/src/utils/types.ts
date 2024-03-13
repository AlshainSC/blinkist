// Variations
export interface VariationContextData {
  assignedVariation: string | null
}

// Signup
export interface SignupButtonProps {
  variation: string | null
}

// Article

export interface ContentBlockComponent {
  (block: ContentBlock): React.ReactElement
}
export type Article = {
  [key: string]: React.FC<ContentBlock>
}

export interface ContentBlock {
  type: string
  content: string
  className?: string
}

export interface ArticleData {
  title: string
  variations: {
    id: string
    content: ContentBlock[]
  }[]
}

//Events
export interface PageviewEvent {
  url: string
  variation: string | null
  visitorId: string | null
}

export interface ClickEvent {
  url: string
  event: string
  variation: string | null
}
