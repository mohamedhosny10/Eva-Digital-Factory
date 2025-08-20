interface AboutSectionProps {
  data?: any
}

export default function AboutSection({ data }: AboutSectionProps) {
  
  
  // Don't render if no data from Strapi
  if (!data) {
    console.log('AboutSection not rendering - missing data')
    return null
  }

  

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>
    </section>
  )
}
