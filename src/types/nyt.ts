// Type definitions for NY Times Article API
export interface NYTMultimedia {
  caption: string
  credit: string
  default: {
    height: number
    url: string
    width: number
  }
  thumbnail: {
    height: number
    url: string
    width: number
  }
}

export interface NYTHeadline {
  main: string
  kicker?: string
  content_kicker?: string
  print_headline?: string
  name?: string
  seo?: string
  sub?: string
}

export interface NYTByline {
  original: string
  person?: Array<{
    firstname: string
    middlename?: string
    lastname: string
    qualifier?: string
    title?: string
    role: string
    organization: string
    rank: number
  }>
  organization?: string
}

export interface NYTKeyword {
  name: string
  value: string
  rank: number
}

export interface NYTArticle {
  _id: string
  web_url: string
  snippet: string
  lead_paragraph?: string
  abstract: string
  print_section?: string
  print_page?: string
  source: string
  multimedia?: NYTMultimedia
  headline: NYTHeadline
  keywords: NYTKeyword[]
  pub_date: string
  document_type: string
  news_desk?: string
  section_name?: string
  subsection_name?: string
  byline?: NYTByline
  type_of_material?: string
  word_count?: number
  uri?: string
}

export interface NYTResponse {
  status: string
  copyright: string
  response: {
    docs: NYTArticle[]
    metadata: {
      hits: number
      offset: number
      time: number
    }
  }
}
