import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Calendar, ArrowRight } from 'lucide-react'
import { getStrapiImageUrl } from '@/lib/api'
import { UpdatesSection } from '@/types/content'

interface NewsUpdatesProps {
  data?: UpdatesSection
}

export default function NewsUpdates({ data }: NewsUpdatesProps) {

  
  // Try different possible data structures
  const articles = data?.updateCards ||  []
  
  
  // Don't render if no data from Strapi
  if (!data || articles.length === 0) {
  
    return null
  }



  return (
    <section id='news' className="py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {data.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {articles.map((article: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-0 shadow-md">
              {article.image && getStrapiImageUrl(article.image) && (
                <div className="aspect-video relative">
                  <Image
                    src={getStrapiImageUrl(article.image)!}
                    alt={article.titleCard}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="bg-yellow-primary text-black px-3 py-1 rounded-full text-xs font-bold">
                    {article.category}
                  </span>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {article.date}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-primary transition-colors">
                  {article.titleCard || article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {article.description || article.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
