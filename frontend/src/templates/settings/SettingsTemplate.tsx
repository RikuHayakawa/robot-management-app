'use client';

import { ApiModeSelector } from '@/features/settings/components/ApiModeSelector';

export const SettingsTemplate = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-foreground mb-6">設定</h1>
      <div className="space-y-6">
        <ApiModeSelector />
      </div>
    </div>
  );
};
