import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utility function to extract data from Strapi responses
export function extractStrapiData(data: any): any {
  if (!data) return null
  
  // If data has the standard Strapi structure with data.attributes
  if (data.data && data.data.attributes) {
    return data.data.attributes
  }
  
  // If data is already the attributes object
  if (data.attributes) {
    return data.attributes
  }
  
  // If data is a direct object
  return data
}
