export type DestinationCategory = 'Pantai' | 'Goa' | 'Wisata Alam' | 'Budaya' | 'Kuliner' | 'Lainnya';

export interface Destination {
  id: string;
  name: string;
  category: DestinationCategory;
  description: string;
  longDescription: string;
  address: string;
  gps: { lat: number; lng: number };
  operatingHours: string;
  ticketPrice: string;
  facilities: string[];
  rating: number;
  reviews: { user: string; comment: string; rating: number }[];
  images: string[];
}
