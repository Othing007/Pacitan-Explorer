'use client';

import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';
import { useTranslation } from '@/hooks/use-translation';

export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t('Tentang Aplikasi')} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex flex-col items-center text-center">
            <Logo className="w-24 h-24 mb-4 text-primary" />
            <h1 className="font-headline text-4xl font-bold">Pacitan Explorer</h1>
            <p className="text-lg text-muted-foreground mt-2">
              {t('Panduan Lengkap Anda untuk Menjelajahi Keajaiban Pacitan')}
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('Misi Kami')}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>{t('misi_kami_p1')}</p>
              <p>{t('misi_kami_p2')}</p>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('Fitur Unggulan')}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
                <p><strong>{t('fitur_1').split(':')[0]}:</strong>{t('fitur_1').split(':')[1]}</p>
                <p><strong>{t('fitur_2').split(':')[0]}:</strong>{t('fitur_2').split(':')[1]}</p>
                <p><strong>{t('fitur_3').split(':')[0]}:</strong>{t('fitur_3').split(':')[1]}</p>
                <p><strong>{t('fitur_4').split(':')[0]}:</strong>{t('fitur_4').split(':')[1]}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">{t('Kontak & Dukungan')}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                {t('kontak_p1')}{' '}
                <a href="mailto:support@pacitanexplorer.app" className="text-primary hover:underline">support@pacitanexplorer.app</a>.
              </p>
              <p className="mt-4">
                {t('kontak_p2')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
