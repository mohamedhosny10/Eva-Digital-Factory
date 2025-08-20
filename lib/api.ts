import axios, { AxiosError } from 'axios'
import qs from 'qs'

// Base Strapi response types
export interface StrapiResponse<T> {
  data: T
  meta: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiCollectionResponse<T> {
  data: T[]
  meta: {
    pagination: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

export interface StrapiError {
  error: {
    status: number
    name: string
    message: string
    details?: any
  }
}

export interface StrapiImageFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  path: string | null
  size: number
  width: number
  height: number
  sizeInBytes: number
}

export interface StrapiImage {
  id: number
  attributes: {
    name: string
    alternativeText: string | null
    caption: string | null
    width: number
    height: number
    formats: {
      large?: StrapiImageFormat
      medium?: StrapiImageFormat
      small?: StrapiImageFormat
      thumbnail?: StrapiImageFormat
    }
    hash: string
    ext: string
    mime: string
    size: number
    url: string
    previewUrl: string | null
    provider: string
    provider_metadata: any | null
    createdAt: string
    updatedAt: string
  }
}

// Retry utility function
async function retryRequest<T>(
  requestFn: () => Promise<T>,
  maxRetries = 3,
  delay = 1000
): Promise<T> {
  let lastError: any
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`Attempt ${attempt} of ${maxRetries}`)
      return await requestFn()
    } catch (error) {
      lastError = error
      
      if (attempt === maxRetries) {
        break
      }
      
      console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`)
      await new Promise(resolve => setTimeout(resolve, delay))
      delay *= 2 // Exponential backoff
    }
  }
  
  throw lastError
}

// Main content fetching function with improved error handling and retry logic
export async function getContent<Type>({
  path,
  locale = 'en',
  populate = '*',
  extraParams = {},
}: {
  path: string
  locale?: string
  populate?: string | string[]
  extraParams?: Record<string, any>
}): Promise<Type> {
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL
  
  if (!cmsUrl) {
    throw new Error('NEXT_PUBLIC_CMS_URL environment variable is not defined')
  }

  // Remove trailing slash and '/api' from CMS_URL if present
  const baseUrl = cmsUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
  
  // Ensure path doesn't start with 'api/' if it's already in the base URL
  const cleanPath = path.startsWith('api/') ? path : `api/${path}`

  // Build query parameters
  const queryParams = {
    locale,
    populate,
    ...extraParams,
  }

  const queryString = qs.stringify(queryParams, {
    encodeValuesOnly: true,
    allowDots: true,
  })

  const url = `${baseUrl}/${cleanPath}?${queryString}`
  
  console.log('Fetching from URL:', url)

  // Create the request function
  const makeRequest = async (): Promise<Type> => {
    const res = await axios.get<Type>(url, {
      timeout: 60000, // Increased to 60 seconds
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'NextJS/Eva-Digital-Factory',
        // Add API token if available
        ...(process.env.NEXT_PUBLIC_STRAPI_API_TOKEN && {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_STRAPI_API_TOKEN}`
        })
      },
      // Add these additional options for better connectivity
      maxRedirects: 5,
      validateStatus: (status) => status < 500, // Accept all status codes below 500
    })
    
    return res.data
  }

  try {
    // Try with retry logic for network issues
    return await retryRequest(makeRequest, 3, 2000)
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<StrapiError>
      
      // Log detailed error information
      console.error('Strapi API Error after retries:', {
        status: axiosError.response?.status,
        statusText: axiosError.response?.statusText,
        message: axiosError.response?.data?.error?.message || axiosError.message,
        url: axiosError.config?.url,
        code: axiosError.code,
        data: axiosError.response?.data,
      })

      // Handle different types of errors
      if (axiosError.code === 'ECONNABORTED') {
        throw new Error('Request timeout - Strapi server may be slow or unavailable')
      }
      
      if (axiosError.code === 'ETIMEDOUT' || axiosError.code === 'ECONNRESET') {
        throw new Error('Network connection timeout - please check your internet connection and try again')
      }
      
      if (axiosError.code === 'ENOTFOUND') {
        throw new Error('CMS server not found - please check the URL configuration')
      }
      
      if (axiosError.response?.status === 404) {
        throw new Error(`Content not found: ${path}`)
      }
      
      if (axiosError.response?.status === 403) {
        throw new Error('Access forbidden - check API permissions')
      }
      
      // if (axiosError.response?.status >= 500) {
      //   throw new Error('Strapi server error - please try again later')
      // }

      const errorMessage = axiosError.response?.data?.error?.message || 
                          axiosError.message || 
                          'Unknown API error'
      
      throw new Error(`Failed to fetch content: ${errorMessage}`)
    }
    
    console.error('Non-Axios error:', error)
    throw new Error(`Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

// Utility function for fetching single content types
export async function getSingleContent<Type>({
  contentType,
  locale = 'en',
  populate = '*',
  extraParams = {},
}: {
  contentType: string
  locale?: string
  populate?: string | string[]
  extraParams?: Record<string, any>
}): Promise<StrapiResponse<Type>> {
  return getContent<StrapiResponse<Type>>({
    path: contentType, // Remove 'api/' prefix since it's handled in getContent
    locale,
    populate,
    extraParams,
  })
}

// Utility function for fetching collection content types
export async function getCollectionContent<Type>({
  contentType,
  locale = 'en',
  populate = '*',
  extraParams = {},
}: {
  contentType: string
  locale?: string
  populate?: string | string[]
  extraParams?: Record<string, any>
}): Promise<StrapiCollectionResponse<Type>> {
  return getContent<StrapiCollectionResponse<Type>>({
    path: contentType, // Remove 'api/' prefix since it's handled in getContent
    locale,
    populate,
    extraParams,
  })
}

// Helper function to get full image URL
export function getStrapiImageUrl(image: any, format: 'large' | 'medium' | 'small' | 'thumbnail' | 'original' = 'original'): string | null {
  if (!image) return null
  
  const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL
  if (!cmsUrl) return null
  
  // Remove '/api' from CMS URL for image paths
  const baseUrl = cmsUrl.replace(/\/api\/?$/, '').replace(/\/$/, '')
  
  // Handle different image data structures
  const imageUrl = image?.attributes?.url || image?.url || image
  if (!imageUrl) return null
  
  // If it's already a full URL, return it
  if (typeof imageUrl === 'string' && (imageUrl.startsWith('http://') || imageUrl.startsWith('https://'))) {
    return imageUrl
  }
  
  if (format === 'original') {
    return `${baseUrl}${imageUrl}`
  }
  
  const formatData = image?.attributes?.formats?.[format] || image?.formats?.[format]
  if (!formatData) {
    return `${baseUrl}${imageUrl}`
  }
  
  const formatUrl = formatData.url || formatData
  if (typeof formatUrl === 'string' && (formatUrl.startsWith('http://') || formatUrl.startsWith('https://'))) {
    return formatUrl
  }
  
  return `${baseUrl}${formatUrl}`
}

// Helper function to get image alt text
export function getStrapiImageAlt(image: any): string {
  return image?.attributes?.alternativeText || image?.attributes?.name || image?.alternativeText || image?.name || 'Image'
}