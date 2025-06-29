'use client';

import React, { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { MapPlaceholder } from '@/components/map-placeholder';
import { DestinationCard } from '@/components/destination-card';
import { AppHeader } from '@/components/app-header';
import { destinations, DestinationCategory } from '@/lib/data';
import { Waves, Mountain, Landmark, Utensils, Building } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

const categoryIcons: Record<DestinationCategory, React.ElementType> = {
  Pantai: Waves,
  Goa: Mountain,
  'Wisata Alam': Mountain,
  Budaya: Landmark,
  Kuliner: Utensils,
  Lainnya: Building,
};

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<DestinationCategory | 'All'>('All');
  const { t } = useTranslation();

  const filteredDestinations = useMemo(() => {
    return destinations.filter((dest) => {
      const matchesCategory = selectedCategory === 'All' || dest.category === selectedCategory;
      const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  const categories: DestinationCategory[] = useMemo(() => {
    const allCategories = destinations.map(d => d.category);
    return Array.from(new Set(allCategories));
  }, []);

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t('Beranda')} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 space-y-8">
        <div className="space-y-4">
          <div className="relative">
            <Input
              placeholder={t('Cari tempat wisata...')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-4 py-6 text-base"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'All' ? 'default' : 'secondary'}
              onClick={() => setSelectedCategory('All')}
              className="rounded-full"
            >
              {t('Semua')}
            </Button>
            {categories.map((category) => {
              const Icon = categoryIcons[category] || Building;
              return (
                <Button
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'secondary'}
                  onClick={() => setSelectedCategory(category)}
                  className="rounded-full"
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {t(category)}
                </Button>
              );
            })}
          </div>
        </div>

        <MapPlaceholder />

        <div>
          <h2 className="font-headline text-2xl font-bold tracking-tight mb-4">
            {t('Destinasi Populer')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredDestinations.map((destination) => (
              <DestinationCard key={destination.id} destination={destination} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
