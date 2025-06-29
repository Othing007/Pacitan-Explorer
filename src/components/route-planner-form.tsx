'use client';

import { useState } from 'react';
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
import { Bot, Map, Route, Clock, Milestone } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from '@/hooks/use-translation';

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
  const { toast } = useToast();
  const { t } = useTranslation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      startLocation: t('Lokasi saat ini'),
      destination: '',
      preferences: [],
      realTimeConditions: t('Lalu lintas normal'),
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    setResult(null);
    try {
      const preferences = (data.preferences as ('fastest' | 'most scenic' | 'avoid highways')[]) || [];
      const response = await smartRoutePlanning({
        ...data,
        preferences,
      });
      setResult(response);
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
                      <Input placeholder={t('Contoh: Alun-alun Pacitan')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                        {destinations.map((dest) => (
                          <SelectItem key={dest.id} value={dest.name}>
                            {dest.name}
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

      {result && (
        <Card className="mt-8 animate-in fade-in-50">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Map className="w-6 h-6 text-primary" /> {t('Rute Direkomendasikan')}
            </CardTitle>
            <CardDescription>
              {t('Rute dari')} {form.getValues('startLocation')} {t('ke')} {form.getValues('destination')}
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
        </Card>
      )}
    </div>
  );
}
