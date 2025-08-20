import { Impact } from '@/types/content'
import { Users, Globe, Award } from 'lucide-react'

interface ImpactNumbersProps {
  data?: Impact
}

export default function ImpactNumbers({ data }: ImpactNumbersProps) {
  const cards = data?.card || []

  if (!data || cards.length === 0) {
    return null
  }

  console.log('ImpactNumbers rendering with', cards.length, 'cards')

  // Function to get the appropriate icon based on index
  const getIcon = (index: number) => {
    switch (index) {
      case 0:
        return Users
      case 1:
        return Globe
      case 2:
        return Award
      default:
        return Award
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-yellow-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black mb-4">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-black/80 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8 sm:gap-6 lg:gap-8">
          {cards.map((stat: any, index: number) => {
            const IconComponent = getIcon(index)
            return (
              <div key={stat.id || index} className="text-center flex flex-col items-center">
                <div className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-black rounded-full mb-4 sm:mb-6 shadow-lg">
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-yellow-primary" />
                </div>
                <div className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-2 tracking-tight">
                  {stat.numberImpact || stat.number}
                </div>
                <p className="text-sm sm:text-base lg:text-lg text-black/80 font-medium">
                  {stat.text || stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
