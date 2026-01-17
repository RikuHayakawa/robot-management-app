import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface TableRowProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export const TableRow = ({ children, className, onClick }: TableRowProps) => {
  return (
    <tr
      className={cn(
        'border-b border-subtle transition-colors',
        onClick && 'cursor-pointer hover:bg-hover',
        className,
      )}
      onClick={onClick}
    >
      {children}
    </tr>
  );
};
