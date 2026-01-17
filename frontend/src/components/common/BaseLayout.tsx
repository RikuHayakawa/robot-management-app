'use client';

import type { PropsWithChildren } from 'react';
import { PageSidebar } from '../sidebar/PageSidebar';

export const BaseLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <PageSidebar />

      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto">{children}</div>
      </main>
    </div>
  );
};
