import { notFound } from 'next/navigation';
import Image from 'next/image';
import { destinations } from '@/lib/data';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Star, MapPin, Clock, Ticket, CheckCircle, MessageSquare } from 'lucide-react';
import { FavoriteToggleButton } from '@/components/favorite-toggle-button';

export async function generateStaticParams() {
  return destinations.map((destination) => ({
    id: destination.id,
  }));
}

export default function DestinationDetailPage({ params }: { params: { id: string } }) {
  const destination = destinations.find((d) => d.id === params.id);

  if (!destination) {
    notFound();
  }

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={destination.name}>
        <FavoriteToggleButton destinationId={destination.id} />
      </AppHeader>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="overflow-hidden">
            <Carousel className="w-full">
              <CarouselContent>
                {destination.images.map((img, index) => (
                  <CarouselItem key={index}>
                    <div className="aspect-video relative">
                      <Image src={img} alt={`${destination.name} - gambar ${index + 1}`} layout="fill" objectFit="cover" data-ai-hint="beautiful landscape" />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-3xl">{destination.name}</CardTitle>
              <div className="flex items-center gap-4 text-muted-foreground pt-2">
                <Badge variant="secondary">{destination.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-primary fill-primary" />
                  <span className="font-bold text-foreground">{destination.rating}</span>
                  <span>({destination.reviews.length} ulasan)</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-base">{destination.longDescription}</p>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Informasi Detail</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">Alamat</h4>
                    <p className="text-muted-foreground">{destination.address}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">Jam Operasional</h4>
                    <p className="text-muted-foreground">{destination.operatingHours}</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Ticket className="w-5 h-5 mt-1 text-primary" />
                  <div>
                    <h4 className="font-semibold">Biaya Tiket</h4>
                    <p className="text-muted-foreground">{destination.ticketPrice}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-headline text-2xl">Fasilitas</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  {destination.facilities.map((facility, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span>{facility}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">Ulasan Pengguna</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {destination.reviews.length > 0 ? (
                destination.reviews.map((review, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">
                      {review.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">{review.user}</h4>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-primary fill-primary' : 'text-muted'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{review.comment}</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2" />
                  <p>Belum ada ulasan untuk destinasi ini.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
