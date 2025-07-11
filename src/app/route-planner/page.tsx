'use client';

import { AppHeader } from '@/components/app-header';
import { RoutePlannerForm } from '@/components/route-planner-form';
import { useTranslation } from '@/hooks/use-translation';

export default function RoutePlannerPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col h-full">
      <AppHeader title={t('Perencana Rute Cerdas')} />
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <RoutePlannerForm />
      </div>
    </div>
  );
}
