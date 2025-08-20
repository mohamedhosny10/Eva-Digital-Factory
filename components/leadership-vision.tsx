import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { getStrapiImageUrl } from "@/lib/api";
import { Leadership } from "@/types/content";

interface LeadershipVisionProps {
  data?: Leadership;
}

export default function LeadershipVision({ data }: LeadershipVisionProps) {
  // Don't render if no data from Strapi
  if (!data) {
    return null;
  }

  return (
    <section className="py-16 lg:py-24 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {data.title} <span className="text-yellow-primary">Vision</span>
          </h2>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Shadow effect behind the card */}
          <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 rounded-2xl transform translate-x-4 translate-y-4 -z-10"></div>

          <Card className="relative bg-white dark:bg-gray-800 border-0 shadow-lg">
            <CardContent className="p-8 lg:p-12">
              <div className="grid lg:grid-cols-3 gap-8 items-center">
                <div className="lg:col-span-2 space-y-6">
                  <div className="text-6xl text-yellow-primary font-serif leading-none">
                    "
                  </div>
                  <blockquote className="text-lg lg:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic font-medium">
                    {data.description}
                  </blockquote>
                  <div className="pt-4">
                    <p className="font-bold text-gray-900 dark:text-white text-lg">
                      {data.name}
                    </p>
                    <p className="text-yellow-primary font-semibold">
                      {data.titleName}
                    </p>
                    {data.restName && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {data.restName}
                      </p>
                    )}
                  </div>
                </div>

                {data.image && getStrapiImageUrl(data.image) && (
                  <div className="flex justify-center lg:justify-end">
                    <div className="relative w-[250px] h-[300px]">
                      <Image
                        src={getStrapiImageUrl(data.image)!}
                        alt={data.image?.alternativeText || data.name}
                        fill
                        className="object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
