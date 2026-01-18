'use client';

import { cn } from '@/utils/cn';
import { useApiSettings, type ApiMode } from '@/contexts/ApiSettingsContext';

const OPTIONS: { value: ApiMode; label: string }[] = [
  { value: 'rest', label: 'REST API' },
  { value: 'graphql', label: 'GraphQL' },
];

export const ApiModeSelector = () => {
  const { mode, setMode } = useApiSettings();

  return (
    <div className="flex flex-col gap-2">
      <label className="block text-sm font-medium text-foreground">API モード</label>
      <div
        className="flex flex-wrap gap-2"
        role="radiogroup"
        aria-label="API モード"
      >
        {OPTIONS.map((opt) => {
          const isSelected = mode === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => setMode(opt.value)}
              className={cn(
                'inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-1',
                isSelected
                  ? 'border-[#D3BAFF] bg-[#F6EEFF] text-[#8200DB] shadow-[0_8px_24px_rgba(130,0,219,0.12),0_0_0_1px_#E8D9FF]'
                  : 'border-[#D9D9E3] bg-white text-[#1F1F24] hover:border-[#C7C7D7] hover:bg-[#F7F7FB] hover:shadow-[0_6px_16px_rgba(0,0,0,0.05)]',
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
