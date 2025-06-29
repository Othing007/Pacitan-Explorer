'use client';

import { AppHeader } from '@/components/app-header';
import { withAuth } from '@/components/with-auth';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';


function AdminPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t('Admin Dashboard')} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle>{t('Selamat Datang Kembali')}, Admin!</CardTitle>
            <CardDescription>
              {t('Ini adalah dasbor admin. Hanya pengguna dengan hak admin yang dapat melihat halaman ini.')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t('Anda dapat mengelola konten aplikasi dari sini.')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(AdminPage, { role: 'admin' });
