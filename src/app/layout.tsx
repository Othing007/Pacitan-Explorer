import type { Metadata } from 'next';
import './globals.css';
import { SidebarProvider, Sidebar, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from "@/components/ui/toaster";
import { TranslationProvider } from '@/components/translation-provider';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'Pacitan Explorer',
  description: 'Your guide to the wonders of Pacitan',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <TranslationProvider>
          <AuthProvider>
            <SidebarProvider>
              <Sidebar>
                <AppSidebar />
              </Sidebar>
              <SidebarInset>
                {children}
              </SidebarInset>
            </SidebarProvider>
            <Toaster />
          </AuthProvider>
        </TranslationProvider>
      </body>
    </html>
  );
}
