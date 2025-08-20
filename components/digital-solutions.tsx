import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiImageUrl } from "@/lib/api";
import { Row } from "@/types/content";
import React from "react";

interface DigitalSolutionsProps {
  data?: Row;
}

export default function DigitalSolutions({ data }: DigitalSolutionsProps) {
  const solutions = data?.card || [];

  if (!data || solutions.length === 0) {
    return null;
  }

  return (
    <section className="py-12 sm:py-16 lg:py-24 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {data.description}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {solutions.map((solution: any, index: number) => (
            <div
              key={solution.id || index}
              className="group overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border-0 shadow-md"
            >
              {solution.image && getStrapiImageUrl(solution.image) && (
                <div className="aspect-video relative">
                  <Image
                    src={getStrapiImageUrl(solution.image)!}
                    alt={solution.titleCard || solution.title}
                    fill
                    className="object-cover"
                    priority={index === 0 || getStrapiImageUrl(solution.image)?.includes('ai_innovation')}
                  />
                </div>
              )}
              <CardContent className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-yellow-primary transition-colors">
                  {solution.titleCard || solution.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {solution.description}
                </p>
                {solution.points && solution.points.length > 0 && (
                  <ul className="space-y-2">
                    {solution.points.map((point: any, pointIndex: number) => (
                      <React.Fragment key={`${solution.id || index}-point-${pointIndex}`}>
                        {point.point1 && (
                          <li className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></div>
                            {point.point1}
                          </li>
                        )}
                        {point.point2 && (
                          <li className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></div>
                            {point.point2}
                          </li>
                        )}
                        {point.point3 && (
                          <li className="flex items-center text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                            <div className="w-2 h-2 bg-yellow-400 rounded-full mr-3 flex-shrink-0"></div>
                            {point.point3}
                          </li>
                        )}
                      </React.Fragment>
                    ))}
                  </ul>
                )}
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
