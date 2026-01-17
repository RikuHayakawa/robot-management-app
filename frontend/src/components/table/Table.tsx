import type { ReactNode } from 'react';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';
import { TableCell } from './TableCell';
import { cn } from '@/utils/cn';

export interface TableColumn<T> {
  key: string;
  label: string;
  render?: (item: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  className?: string;
  onRowClick?: (item: T, index: number) => void;
}

export const Table = <T,>({ columns, data, className, onRowClick }: TableProps<T>) => {
  return (
    <div className={cn('overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-subtle">
            {columns.map((column) => (
              <TableHeader key={column.key} className={column.headerClassName}>
                {column.label}
              </TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(item, rowIndex) : undefined}
            >
              {columns.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {column.render ? column.render(item, rowIndex) : String((item as any)[column.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};
