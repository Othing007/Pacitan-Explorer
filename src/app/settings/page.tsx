'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { withAuth } from '@/components/with-auth';

function SettingsPage() {
  const { t, language, setLanguage } = useTranslation();
  const [recommendations, setRecommendations] = useState(true);
  const [events, setEvents] = useState(false);
  const [mapMode, setMapMode] = useState('street');
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, you would save these settings to a persistent store
    // like localStorage or a backend database.
    toast({
      title: t("Pengaturan Disimpan"),
      description: t("Preferensi Anda telah berhasil diperbarui."),
    });
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t("Pengaturan")} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('Notifikasi')}</CardTitle>
              <CardDescription>
                {t('Notifikasi_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="recommendations" className="flex flex-col space-y-1">
                  <span>{t('Rekomendasi Destinasi')}</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    {t('Rekomendasi Destinasi_desc')}
                  </span>
                </Label>
                <Switch 
                  id="recommendations" 
                  checked={recommendations}
                  onCheckedChange={setRecommendations}
                />
              </div>
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="events" className="flex flex-col space-y-1">
                  <span>{t('Acara Wisata')}</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    {t('Acara Wisata_desc')}
                  </span>
                </Label>
                <Switch 
                  id="events" 
                  checked={events}
                  onCheckedChange={setEvents}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('Preferensi Peta')}</CardTitle>
              <CardDescription>
                {t('Preferensi Peta_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="relative aspect-video w-full overflow-hidden rounded-md">
                <Image
                    src="https://placehold.co/600x400.png"
                    alt="Peta"
                    layout="fill"
                    objectFit="cover"
                    data-ai-hint="map abstract"
                />
              </div>
               <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="map-mode">{t('Mode Tampilan Peta')}</Label>
                   <Select value={mapMode} onValueChange={setMapMode}>
                      <SelectTrigger id="map-mode">
                        <SelectValue placeholder={t('Pilih mode')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="street">{t('Jalan')}</SelectItem>
                        <SelectItem value="satellite">{t('Satelit')}</SelectItem>
                        <SelectItem value="hybrid">{t('Hybrid')}</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('Bahasa')}</CardTitle>
              <CardDescription>
                {t('Bahasa_desc')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="language">{t('Bahasa Aplikasi')}</Label>
                   <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">{t('Bahasa Indonesia')}</SelectItem>
                        <SelectItem value="en">{t('English')}</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
            </CardContent>
          </Card>
          <div className="flex justify-end">
            <Button onClick={handleSaveChanges}>{t('Simpan Perubahan')}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(SettingsPage);
