import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { getStrapiImageUrl } from '@/lib/api'
import { Hero } from '@/types/content'

interface HeroSectionProps {
  data?: Hero
}

export default function HeroSection({ data }: HeroSectionProps) {
  // Don't render if no data from Strapi
  if (!data) {
    return null
  }

  return (
    <section id='home' className="bg-gray-50 dark:bg-gray-800 py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                {data.title}
              </h1>
              <h2 className="text-3xl lg:text-4xl font-bold text-yellow-primary tracking-tight mb-6">
                {data.subtitle}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Right Column: Image */}
          {data.image && getStrapiImageUrl(data.image) && (
            <div className="relative w-full max-w-[350px] aspect-[3/2] mx-auto">
              <Image
                src={getStrapiImageUrl(data.image)!}
                alt={data.image?.alternativeText || data.title || "Hero image"}
                width={464}
                height={500}
                className="object-cover rounded-lg"
                priority
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
