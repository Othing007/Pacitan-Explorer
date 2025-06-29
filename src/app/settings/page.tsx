'use client';

import { useState } from 'react';
import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const [recommendations, setRecommendations] = useState(true);
  const [events, setEvents] = useState(false);
  const [mapMode, setMapMode] = useState('street');
  const [language, setLanguage] = useState('id');
  const { toast } = useToast();

  const handleSaveChanges = () => {
    // In a real app, you would save these settings to a persistent store
    // like localStorage or a backend database.
    toast({
      title: "Pengaturan Disimpan",
      description: "Preferensi Anda telah berhasil diperbarui.",
    });
  };

  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Pengaturan" />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Notifikasi</CardTitle>
              <CardDescription>
                Atur notifikasi yang ingin Anda terima dari aplikasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-x-2">
                <Label htmlFor="recommendations" className="flex flex-col space-y-1">
                  <span>Rekomendasi Destinasi</span>
                  <span className="font-normal leading-snug text-muted-foreground">
                    Terima notifikasi tentang tempat wisata baru atau yang sedang populer.
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
                  <span>Acara Wisata</span>
                   <span className="font-normal leading-snug text-muted-foreground">
                    Dapatkan info tentang festival atau acara khusus di Pacitan.
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
              <CardTitle className="font-headline">Preferensi Peta</CardTitle>
              <CardDescription>
                Pilih tampilan default untuk peta di aplikasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="map-mode">Mode Tampilan Peta</Label>
                   <Select value={mapMode} onValueChange={setMapMode}>
                      <SelectTrigger id="map-mode">
                        <SelectValue placeholder="Pilih mode" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="street">Jalan</SelectItem>
                        <SelectItem value="satellite">Satelit</SelectItem>
                        <SelectItem value="hybrid">Hybrid</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Bahasa</CardTitle>
              <CardDescription>
                Pilih bahasa yang digunakan dalam aplikasi.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="grid w-full max-w-sm items-center gap-1.5">
                  <Label htmlFor="language">Bahasa Aplikasi</Label>
                   <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger id="language">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="id">Bahasa Indonesia</SelectItem>
                        <SelectItem value="en" disabled>English (Coming Soon)</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
            </CardContent>
             <CardFooter>
                 <Button onClick={handleSaveChanges}>Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
