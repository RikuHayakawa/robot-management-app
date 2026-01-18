'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from 'react';

export type ApiMode = 'rest' | 'graphql';

const STORAGE_KEY = 'api-mode';

type ApiSettingsContextValue = {
  mode: ApiMode;
  setMode: (m: ApiMode) => void;
};

const ApiSettingsContext = createContext<ApiSettingsContextValue | null>(null);

function parseStored(s: string | null): ApiMode | null {
  if (s === 'rest' || s === 'graphql') return s;
  return null;
}

export function ApiSettingsProvider({ children }: PropsWithChildren) {
  const [mode, setModeState] = useState<ApiMode>('rest');

  useEffect(() => {
    const stored = parseStored(
      typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null,
    );
    if (stored) setModeState(stored);
  }, []);

  const setMode = useCallback((m: ApiMode) => {
    if (typeof window !== 'undefined') localStorage.setItem(STORAGE_KEY, m);
    setModeState(m);
  }, []);

  return (
    <ApiSettingsContext.Provider value={{ mode, setMode }}>
      {children}
    </ApiSettingsContext.Provider>
  );
}

export function useApiSettings(): ApiSettingsContextValue {
  const ctx = useContext(ApiSettingsContext);
  if (!ctx) throw new Error('useApiSettings must be used within ApiSettingsProvider');
  return ctx;
}
