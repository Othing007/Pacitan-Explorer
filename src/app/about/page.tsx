import { AppHeader } from '@/components/app-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Logo } from '@/components/logo';

export default function AboutPage() {
  return (
    <div className="flex flex-col h-full">
      <AppHeader title="Tentang Aplikasi" />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="flex flex-col items-center text-center">
            <Logo className="w-24 h-24 mb-4 text-primary" />
            <h1 className="font-headline text-4xl font-bold">Pacitan Explorer</h1>
            <p className="text-lg text-muted-foreground mt-2">
              Panduan Lengkap Anda untuk Menjelajahi Keajaiban Pacitan
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Misi Kami</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-4">
              <p>
                Pacitan Explorer lahir dari kecintaan kami terhadap keindahan alam dan budaya yang dimiliki Kabupaten Pacitan. Misi kami adalah untuk mempermudah wisatawan, baik lokal maupun mancanegara, dalam menemukan dan menjelajahi setiap sudut keajaiban yang ditawarkan oleh "Kota 1001 Goa".
              </p>
              <p>
                Kami percaya bahwa dengan teknologi, informasi mengenai destinasi wisata dapat diakses dengan lebih mudah dan interaktif. Melalui aplikasi ini, kami berharap dapat membantu mempromosikan pariwisata Pacitan dan memberikan pengalaman terbaik bagi para pelancong.
              </p>
            </CardContent>
          </Card>
          
           <Card>
            <CardHeader>
              <CardTitle className="font-headline">Fitur Unggulan</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-2">
                <p><strong>Peta Interaktif:</strong> Visualisasikan lokasi dan rencanakan perjalanan Anda.</p>
                <p><strong>Perencana Rute Cerdas:</strong> Dapatkan rekomendasi rute terbaik dengan bantuan AI.</p>
                <p><strong>Informasi Lengkap:</strong> Dari harga tiket, jam buka, hingga fasilitas, semua ada di sini.</p>
                <p><strong>Simpan Favorit:</strong> Tandai tempat impian Anda dan akses dengan cepat.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Kontak & Dukungan</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                Punya pertanyaan, masukan, atau ingin bekerja sama? Jangan ragu untuk menghubungi kami melalui email di <a href="mailto:support@pacitanexplorer.app" className="text-primary hover:underline">support@pacitanexplorer.app</a>.
              </p>
              <p className="mt-4">
                Aplikasi ini adalah proyek sumber terbuka yang dibangun dengan Firebase dan Next.js.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
