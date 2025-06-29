'use client';

import { useAuth } from '@/contexts/auth-context';
import { signOutUser } from '@/lib/firebase/auth';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { LogIn, LogOut, User as UserIcon, Shield } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import Link from 'next/link';
import { Skeleton } from './ui/skeleton';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { useTranslation } from '@/hooks/use-translation';

const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',');

export function UserProfile() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { t } = useTranslation();

  const handleLogout = async () => {
    await signOutUser();
    router.push('/auth');
  };
  
  const isAdmin = user ? ADMIN_UIDS.includes(user.uid) : false;

  if (loading) {
    return <Skeleton className="h-10 w-full rounded-md" />;
  }

  if (!user) {
    return (
      <Link href="/auth" className="w-full">
        <Button variant="outline" className="w-full">
          <LogIn className="mr-2 h-4 w-4" />
          {t('Masuk')}
        </Button>
      </Link>
    );
  }
  
  const userInitial = user.displayName ? user.displayName.charAt(0).toUpperCase() : (user.email ? user.email.charAt(0).toUpperCase() : <UserIcon/>);

  return (
    <div className="flex w-full items-center gap-2">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex-1 justify-start text-left p-2 h-auto">
                    <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                            {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || t('Pengguna')} />}
                            <AvatarFallback>{userInitial}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col truncate">
                            <span className="font-semibold truncate">{user.displayName || t('Pengguna')}</span>
                            <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                        </div>
                    </div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.displayName || t('Pengguna')}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">
                        <Shield className="mr-2 h-4 w-4" />
                        <span>{t('Admin Dashboard')}</span>
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t('Keluar')}</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}
