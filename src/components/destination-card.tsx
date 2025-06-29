import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Destination } from '@/lib/types';
import { FavoriteToggleButton } from './favorite-toggle-button';
import { Star } from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
}

export function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Link href={`/destinations/${destination.id}`}>
          <div className="aspect-video relative block">
            <Image
              src={destination.images[0]}
              alt={destination.name}
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
              data-ai-hint="beach pacitan"
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <Badge variant="secondary" className="mb-2">{destination.category}</Badge>
        <Link href={`/destinations/${destination.id}`}>
          <CardTitle className="font-headline text-xl leading-tight hover:text-primary transition-colors">
            {destination.name}
          </CardTitle>
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
          {destination.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Star className="w-4 h-4 text-primary fill-primary" />
          <span className="text-sm font-bold">{destination.rating}</span>
          <span className="text-xs text-muted-foreground">({destination.reviews.length} ulasan)</span>
        </div>
        <FavoriteToggleButton destinationId={destination.id} />
      </CardFooter>
    </Card>
  );
}
