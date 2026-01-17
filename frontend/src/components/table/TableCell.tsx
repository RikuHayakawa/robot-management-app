import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TableCellProps {
  children: ReactNode;
  className?: string;
}

export const TableCell = ({ children, className }: TableCellProps) => {
  return (
    <td className={cn('px-4 py-3 text-sm text-foreground', className)}>
      {children}
    </td>
  );
};
