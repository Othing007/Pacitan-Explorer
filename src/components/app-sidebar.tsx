'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarContent,
  SidebarTrigger,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/logo';
import {
  Map,
  Bot,
  Heart,
  Image as ImageIcon,
  Cog,
  Info,
} from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { UserProfile } from './user-profile';

export function AppSidebar() {
  const pathname = usePathname();
  const { t } = useTranslation();

  const menuItems = [
    { href: '/', label: t('Beranda'), icon: Map },
    { href: '/route-planner', label: t('Perencana Rute'), icon: Bot },
    { href: '/favorites', label: t('Favorit'), icon: Heart },
    { href: '/gallery', label: t('Galeri'), icon: ImageIcon },
  ];
  
  const secondaryMenuItems = [
      { href: '/settings', label: t('Pengaturan'), icon: Cog },
      { href: '/about', label: t('Tentang'), icon: Info },
  ]

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <>
      <SidebarHeader>
        <div className="flex items-center gap-2">
          <Logo className="w-8 h-8 text-primary" />
          <div className="flex flex-col">
            <h2 className="font-headline text-lg font-semibold tracking-tight text-sidebar-foreground">
              Pacitan Explorer
            </h2>
          </div>
          <div className="flex-1" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
               <SidebarMenuButton
                asChild
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
        
        <SidebarSeparator />

        <SidebarMenu>
            {secondaryMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(item.href)}
                    tooltip={item.label}
                  >
                    <Link href={item.href}>
                        <item.icon />
                        <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
            ))}
        </SidebarMenu>

      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
            <SidebarMenuItem>
              <UserProfile />
            </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
