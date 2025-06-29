'use client';

import { useState, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { smartRoutePlanning, SmartRoutePlanningOutput } from '@/ai/flows/smart-route-planning';
import { destinations } from '@/lib/data';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Bot, Map, Route, Clock, Milestone, MapPin } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  startLocation: z.string().min(1, 'Lokasi awal harus diisi'),
  destination: z.string().min(1, 'Tujuan harus dipilih'),
  preferences: z.array(z.string()).optional(),
  realTimeConditions: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function RoutePlannerForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SmartRoutePlanningOutput | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [routeQuery, setRouteQuery] = useState<{ startLocation: string; destination: string; } | null>(null);
  const [sortOrder, setSortOrder] = useState<'alphabetical' | 'category' | 'rating'>('alphabetical');
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: '',
      destination: '',
      preferences: [],
      realTimeConditions: t('Lalu lintas normal'),
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
            if (!response.ok) {
              throw new Error('Reverse geocoding failed');
            }
            const data = await response.json();
            const locationName = data.display_name || `${latitude}, ${longitude}`;
            form.setValue('startLocation', locationName);
          } catch (error) {
            console.error('Error fetching location name:', error);
            form.setValue('startLocation', `${latitude}, ${longitude}`);
          } finally {
            setIsLocating(false);
          }
        },
        (error) => {
          console.warn(`Geolocation error: ${error.message}`);
          form.setValue('startLocation', t('Lokasi saat ini'));
          setIsLocating(false);
        }
      );
    } else {
      form.setValue('startLocation', t('Lokasi saat ini'));
      setIsLocating(false);
    }
  }, [form, t]);


  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    setRouteQuery(null);
    try {
      const preferences = (data.preferences as ('fastest' | 'most scenic' | 'avoid highways')[]) || [];
      const response = await smartRoutePlanning({
        ...data,
        preferences,
      });
      setResult(response);
      setRouteQuery({ startLocation: data.startLocation, destination: data.destination });
    } catch (error) {
      console.error('Error planning route:', error);
      toast({
        variant: 'destructive',
        title: t('Gagal Merencanakan Rute'),
        description: t('Gagal Merencanakan Rute_desc'),
      });
    } finally {
      setLoading(false);
    }
  };

  const preferencesItems = [
    { id: 'fastest', label: t('Rute Tercepat') },
    { id: 'most scenic', label: t('Rute Paling Indah') },
    { id: 'avoid highways', label: t('Hindari Jalan Raya') },
  ];
  
  const sortedDestinations = useMemo(() => {
    const destinationsCopy = [...destinations];
    switch (sortOrder) {
      case 'category':
        return destinationsCopy.sort((a, b) => {
          if (a.category !== b.category) {
            return a.category.localeCompare(b.category, 'id');
          }
          return a.name.localeCompare(b.name, 'id');
        });
      case 'rating':
        return destinationsCopy.sort((a, b) => b.rating - a.rating);
      case 'alphabetical':
      default:
        return destinationsCopy.sort((a, b) => a.name.localeCompare(b.name, 'id'));
    }
  }, [sortOrder]);

  const destinationDetails = useMemo(() => {
    if (!routeQuery) return null;
    return destinations.find(d => d.name === routeQuery.destination);
  }, [routeQuery]);

  const mapsUrl = useMemo(() => {
    if (!routeQuery || !destinationDetails) return '#';
    const origin = encodeURIComponent(routeQuery.startLocation);
    const dest = encodeURIComponent(destinationDetails.address);
    return `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${dest}&travelmode=driving`;
  }, [routeQuery, destinationDetails]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Bot className="w-8 h-8 text-primary" />
            <div>
              <CardTitle className="font-headline text-2xl">{t('Rekomendasi Rute AI')}</CardTitle>
              <CardDescription>{t('Rekomendasi Rute AI_desc')}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="startLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Lokasi Awal')}</FormLabel>
                    <FormControl>
                      {isLocating ? (
                         <Skeleton className="h-10 w-full" />
                      ) : (
                        <Input placeholder={t('Contoh: Alun-alun Pacitan')} {...field} />
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormItem>
                <FormLabel>{t('Urutkan Tujuan')}</FormLabel>
                <RadioGroup
                  value={sortOrder}
                  onValueChange={(value: 'alphabetical' | 'category' | 'rating') => setSortOrder(value)}
                  className="flex items-center space-x-4 pt-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="alphabetical" id="r-alpha" />
                    <Label htmlFor="r-alpha" className="font-normal">{t('Alfabetis')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="category" id="r-cat" />
                    <Label htmlFor="r-cat" className="font-normal">{t('Kategori')}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="rating" id="r-rate" />
                    <Label htmlFor="r-rate" className="font-normal">{t('Rating')}</Label>
                  </div>
                </RadioGroup>
              </FormItem>
              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('Tujuan')}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t('Pilih destinasi wisata')} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {sortedDestinations.map((dest) => (
                          <SelectItem key={dest.id} value={dest.name}>
                            {dest.name}{sortOrder === 'rating' && ` (${dest.rating}★)`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="preferences"
                render={() => (
                  <FormItem>
                    <FormLabel>{t('Preferensi Rute')}</FormLabel>
                    <div className="space-y-2">
                      {preferencesItems.map((item) => (
                        <FormField
                          key={item.id}
                          control={form.control}
                          name="preferences"
                          render={({ field }) => {
                            return (
                              <FormItem key={item.id} className="flex flex-row items-start space-x-3 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value?.includes(item.id)}
                                    onCheckedChange={(checked) => {
                                      return checked
                                        ? field.onChange([...(field.value || []), item.id])
                                        : field.onChange(field.value?.filter((value) => value !== item.id));
                                    }}
                                  />
                                </FormControl>
                                <FormLabel className="font-normal">{item.label}</FormLabel>
                              </FormItem>
                            );
                          }}
                        />
                      ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="w-full">
                {loading ? t('Mencari rute...') : t('Rencanakan Rute')}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {loading && (
        <Card className="mt-8">
          <CardHeader>
             <Skeleton className="h-6 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
          </CardHeader>
          <CardContent className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </CardContent>
        </Card>
      )}

      {result && routeQuery && (
        <Card className="mt-8 animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Map className="w-6 h-6 text-primary" /> {t('Rute Direkomendasikan')}
            </CardTitle>
            <CardDescription>
              {t('Rute dari')} {routeQuery.startLocation} {t('ke')} {routeQuery.destination}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 p-2 bg-secondary rounded-md">
                    <Clock className="w-5 h-5 text-secondary-foreground" />
                    <span className="font-bold text-secondary-foreground">{result.estimatedTime}</span>
                </div>
                 <div className="flex items-center gap-2 p-2 bg-secondary rounded-md">
                    <Milestone className="w-5 h-5 text-secondary-foreground" />
                    <span className="font-bold text-secondary-foreground">{result.estimatedDistance}</span>
                </div>
            </div>
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2"><Route className="w-5 h-5" /> {t('Deskripsi Rute')}</h4>
              <p className="text-sm text-muted-foreground">{result.routeDescription}</p>
            </div>
            <div>
              <h4 className="font-bold mb-2 flex items-center gap-2"><Milestone className="w-5 h-5" /> {t('Ringkasan Perjalanan')}</h4>
              <p className="text-sm text-muted-foreground">{result.routeSummary}</p>
            </div>
          </CardContent>
           <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                <MapPin className="w-4 h-4 mr-2" />
                {t('Buka di Google Maps')}
              </a>
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
