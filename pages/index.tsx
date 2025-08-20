import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import DigitalSolutions from '@/components/digital-solutions'
import ImpactNumbers from '@/components/impact-numbers'
import LeadershipVision from '@/components/leadership-vision'
import NewsUpdates from '@/components/news-updates'
import AboutSection from '@/components/about-section'
import Footer from '@/components/footer'
import { getContent } from '@/lib/api'
import { extractStrapiData } from '@/lib/utils'
import { IHome, ISingleContent } from '@/types/content'
import { GetServerSideProps } from "next"

export const getServerSideProps: GetServerSideProps = async ({  }) => {
  try {
      console.log('Environment check - CMS URL:', process.env.NEXT_PUBLIC_CMS_URL)
      
      const home = await getContent<ISingleContent<IHome>>({
          path: "home-page",
          extraParams: {
            "populate[metaImage]": "*",
            "populate[hero][populate]": "*",
            "populate[row][populate][card][populate]": "*",
            "populate[impact][populate][card][populate]": "*",
            "populate[leadership][populate]": "*",
            "populate[updates][populate][updateCards][populate]": "*",
            "populate[about][populate]": "*"
          },
      })
      
      // console.log('Raw home response:', JSON.stringify(home, null, 2));
      console.log('Home data fetched successfully:', home ? 'Success' : 'No data')
      return { 
        props: { 
          home: home || null 
        } 
      }
  } catch (err) {
      console.error("Error fetching home page:", err)
      
      // Return props with null home data instead of redirecting
      // This allows the page to render with fallback content
      return { 
        props: { 
          home: null,
          error: err instanceof Error ? err.message : 'Unknown error'
        } 
      }
  }
}

export default function Home({ home, error }: { 
  home: ISingleContent<IHome> | null
  error?: string 
}) {
  console.log('Home data in component:', home ? 'Data available' : 'No data available')
  
  // Show error message during development
  if (error && process.env.NODE_ENV === 'development') {
    console.error('CMS Error:', error)
  }
  
  const homeData = home?.data
  
  // Debug: Log the structure of each section

  

  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection data={extractStrapiData(homeData?.hero)} />
      <DigitalSolutions data={extractStrapiData(homeData?.row)} />
      <ImpactNumbers data={extractStrapiData(homeData?.impact)} />
      <LeadershipVision data={extractStrapiData(homeData?.leadership)} />
      <NewsUpdates data={extractStrapiData(homeData?.updates?.[0])} />
      <AboutSection data={extractStrapiData(homeData?.about?.[0])} />
      <Footer />
    </main>
  )
}