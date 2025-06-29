'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { signUpWithEmailAndPassword, signInWithEmailAndPassword, signInWithGoogle } from '@/lib/firebase/auth';
import { Logo } from '@/components/logo';
import { useTranslation } from '@/hooks/use-translation';

export default function AuthPage() {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(email, password);
      } else {
        await signUpWithEmailAndPassword(email, password);
      }
      router.push('/');
      toast({
        title: t(isLogin ? 'Login Berhasil' : 'Pendaftaran Berhasil'),
        description: t('Selamat datang di Pacitan Explorer!'),
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: t('Terjadi Kesalahan'),
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
        await signInWithGoogle();
        router.push('/');
          toast({
            title: t('Login Berhasil'),
            description: t('Selamat datang di Pacitan Explorer!'),
        });
    } catch (error: any) {
          toast({
            variant: 'destructive',
            title: t('Terjadi Kesalahan'),
            description: error.message,
        });
    } finally {
        setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo className="w-16 h-16 text-primary" />
          </div>
          <CardTitle className="font-headline text-3xl">{t(isLogin ? 'Selamat Datang Kembali' : 'Buat Akun Baru')}</CardTitle>
          <CardDescription>{t(isLogin ? 'Masuk untuk melanjutkan petualangan Anda.' : 'Daftar untuk mulai menjelajahi Pacitan.')}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t('Email')}</Label>
              <Input id="email" type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t('Password')}</Label>
              <Input id="password" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? t('Memproses...') : (isLogin ? t('Masuk') : t('Daftar'))}
            </Button>
          </form>
            <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">
                {t('Atau lanjutkan dengan')}
              </span>
            </div>
          </div>

          <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 62.3l-67.4 64.8C309.1 106.3 281.3 96 248 96c-88.8 0-160.1 72.1-160.1 160.1s71.3 160.1 160.1 160.1c98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
            {t('Google')}
          </Button>
          
          <div className="mt-4 text-center text-sm">
            {t(isLogin ? "Belum punya akun? " : "Sudah punya akun? ")}
            <button onClick={() => setIsLogin(!isLogin)} className="underline font-semibold text-primary">
              {t(isLogin ? 'Daftar di sini' : 'Masuk di sini')}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
