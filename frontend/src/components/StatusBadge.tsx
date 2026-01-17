import { cn } from '@/utils/cn';

interface StatusBadgeProps {
  status: 'active' | 'inactive';
  className?: string;
}

export const StatusBadge = ({ status, className }: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2.5 py-1 text-xs font-medium text-white',
        status === 'active' ? 'bg-secondary' : 'bg-[#6C757D]',
        className,
      )}
    >
      {status === 'active' ? 'アクティブ' : '非アクティブ'}
    </span>
  );
};
