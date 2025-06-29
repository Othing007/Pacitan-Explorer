'use client';

import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect, ComponentType } from 'react';
import { Loader2 } from 'lucide-react';

interface WithAuthProps {
  role?: 'user' | 'admin';
}

const ADMIN_UIDS = (process.env.NEXT_PUBLIC_ADMIN_UIDS || '').split(',');

export function withAuth<P extends object>(
  WrappedComponent: ComponentType<P>,
  options: WithAuthProps = {}
): ComponentType<P> {
  const AuthComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();
    const { role } = options;

    useEffect(() => {
      if (loading) {
        return;
      }

      if (!user) {
        router.replace('/auth');
        return;
      }

      if (role === 'admin' && !ADMIN_UIDS.includes(user.uid)) {
        router.replace('/');
        return;
      }
    }, [user, loading, router, role]);

    if (loading || !user || (role === 'admin' && !ADMIN_UIDS.includes(user.uid))) {
      return (
        <div className="flex items-center justify-center h-screen">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
}
