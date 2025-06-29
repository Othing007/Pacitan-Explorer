'use client';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function MapPlaceholder() {
  const { t } = useTranslation();
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative aspect-video w-full">
          <Image
            src="https://placehold.co/1600x900.png"
            alt="Peta Pacitan"
            layout="fill"
            objectFit="cover"
            className="opacity-70"
            data-ai-hint="map pacitan"
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40">
            <MapPin className="h-12 w-12 text-white/80" />
            <p className="mt-4 text-lg font-semibold text-white">
              {t('Peta Interaktif Segera Hadir')}
            </p>
            <p className="text-sm text-white/80">
              {t('Peta Interaktif_desc')}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
