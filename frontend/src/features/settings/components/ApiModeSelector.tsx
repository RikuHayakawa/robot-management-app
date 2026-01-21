'use client';

import { RadioGroup } from '@/components/form/RadioGroup';
import { useApiSettings } from '@/contexts/ApiSettingsContext';
import type { ApiMode } from '@/api';

const OPTIONS = [
  { value: 'rest' as const, label: 'REST' },
  { value: 'graphql' as const, label: 'GraphQL' },
];

export const ApiModeSelector = () => {
  const { mode, setMode } = useApiSettings();

  return (
    <RadioGroup
      value={mode}
      onChange={(v) => setMode(v as ApiMode)}
      options={OPTIONS}
      label="API モード"
      ariaLabel="API モード"
    />
  );
};
