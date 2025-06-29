"use client"

import { useFavorites } from '@/hooks/use-favorites';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

interface FavoriteToggleButtonProps {
  destinationId: string;
}

export function FavoriteToggleButton({ destinationId }: FavoriteToggleButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { t } = useTranslation();
  const favorite = isFavorite(destinationId);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        toggleFavorite(destinationId);
      }}
      aria-label={favorite ? t('Hapus dari favorit') : t('Tambah ke favorit')}
      className="text-muted-foreground hover:text-destructive"
    >
      <Heart className={`w-5 h-5 transition-all ${favorite ? 'fill-destructive text-destructive' : ''}`} />
    </Button>
  );
}
