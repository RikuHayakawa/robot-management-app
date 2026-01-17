import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TableHeaderProps {
  children: ReactNode;
  className?: string;
}

export const TableHeader = ({ children, className }: TableHeaderProps) => {
  return (
    <th className={cn('px-4 py-3 text-left text-sm font-medium text-foreground bg-light-dark', className)}>
      {children}
    </th>
  );
};
