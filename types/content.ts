// Content type definitions for the application (Strapi v5 flattened response)

// ---------- Shared file/image types ----------
export interface StrapiFileFormat {
  name: string
  hash: string
  ext: string | null
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  sizeInBytes?: number
  url: string
}

export interface StrapiFile {
  id: number
  documentId: string
  name: string
  alternativeText: string | null
  caption: string | null
  width: number | null
  height: number | null
  formats?: {
    thumbnail?: StrapiFileFormat
    small?: StrapiFileFormat
    medium?: StrapiFileFormat
    large?: StrapiFileFormat
  } | null
  hash: string
  ext: string | null
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: any | null
  createdAt: string
  updatedAt: string
  publishedAt: string
}

// ---------- Sections ----------
export interface Hero {
  id: number
  title: string
  subtitle: string
  description: string
  image: StrapiFile
}

export interface RowCardPoint {
  id: number
  point1?: string
  point2?: string
  point3?: string
}

export interface RowCard {
  id: number
  titleCard: string
  description: string
  image: StrapiFile
  points: RowCardPoint[]
}

export interface Row {
  id: number
  title: string
  description: string
  card: RowCard[]
}

export interface ImpactCard {
  id: number
  numberImpact: string
  text: string
  icon: StrapiFile | null
}

export interface Impact {
  id: number
  title: string
  description: string
  card: ImpactCard[]
}

export interface Leadership {
  id: number
  title: string
  description: string
  name: string
  titleName: string
  restName: string
  image: StrapiFile
}

export interface UpdateCard {
  id: number
  titleCard: string
  date: string // ISO date string
  category: string
  description: string
  image: StrapiFile
}

export interface UpdatesSection {
  id: number
  title: string
  subtitle: string
  updateCards: UpdateCard[]
}

export interface AboutSection {
  id: number
  title: string
  description: string
}

// ---------- Home (Single Type) ----------
export interface IHome {
  id: number
  documentId: string
  title: string
  subTitle: string
  description: string
  createdAt: string
  updatedAt: string
  publishedAt: string

  // sections
  hero: Hero
  row: Row
  impact: Impact
  leadership: Leadership
  updates: UpdatesSection[]   // NOTE: array in your payload
  about: AboutSection[]       // NOTE: array in your payload

  // Optional – only include if you really have it in your API:
  // metaImage?: StrapiFile
}

// ---------- Generic Strapi wrapper for Single Types ----------
export interface ISingleContent<T> {
  data: T | null
  meta?: Record<string, any>
}
