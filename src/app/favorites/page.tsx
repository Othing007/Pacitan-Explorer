'use client';

import { useMemo } from 'react';
import { AppHeader } from '@/components/app-header';
import { DestinationCard } from '@/components/destination-card';
import { useFavorites } from '@/hooks/use-favorites';
import { destinations } from '@/lib/data';
import { Heart } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { withAuth } from '@/components/with-auth';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const { t } = useTranslation();

  const favoriteDestinations = useMemo(() => {
    return destinations.filter((dest) => favorites.includes(dest.id));
  }, [favorites]);

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t('Destinasi Favorit')} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        {favoriteDestinations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favoriteDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <Heart className="w-16 h-16 mb-4 text-gray-400" />
            <h2 className="font-headline text-2xl font-semibold mb-2">{t('Belum Ada Favorit')}</h2>
            <p className="max-w-md mb-6">
              {t('Belum ada favorit_desc')}
            </p>
            <Link href="/">
              <Button>{t('Jelajahi Destinasi')}</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default withAuth(FavoritesPage);
