'use client';

import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/app-header';
import { destinations } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';

export default function GalleryPage() {
  const { t } = useTranslation();
  const allImages = destinations.flatMap(dest => 
    dest.images.map(image => ({
      src: image,
      alt: dest.name,
      id: dest.id,
      name: dest.name,
    }))
  );

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t('Galeri Foto')} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {allImages.map((image, index) => (
            <Link key={`${image.id}-${index}`} href={`/destinations/${image.id}`} className="block break-inside-avoid group">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 group-hover:scale-105"
                      data-ai-hint="scenic landscape"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="font-headline text-lg font-semibold text-white tracking-tight">
                        {image.name}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
