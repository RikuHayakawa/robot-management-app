'use client';

import { useEffect, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  maxWidth?: keyof typeof maxWidthClasses;
  maxHeight?: keyof typeof maxHeightClasses;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

const maxWidthClasses = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  '4xl': 'max-w-4xl',
  half: 'max-w-1/2',
  'two-thirds': 'max-w-2/3',
  'three-quarters': 'max-w-3/4',
  full: 'max-w-full',
};

const maxHeightClasses = {
  sm: 'max-h-[20rem]',
  md: 'max-h-[28rem]',
  lg: 'max-h-[36rem]',
  xl: 'max-h-[44rem]',
  '2xl': 'max-h-[52rem]',
  '3xl': 'max-h-[60rem]',
  full: 'max-h-full',
  screen: 'max-h-screen',
};

export const BaseModal = ({
  open,
  onClose,
  children,
  className,
  maxWidth = '2xl',
  closeOnBackdropClick = true,
  closeOnEscape = true,
}: BaseModalProps) => {
  useEffect(() => {
    if (!closeOnEscape || !open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, closeOnEscape]);

  if (!open) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnBackdropClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-screen max-h-full overflow-y-auto overflow-x-hidden bg-gray-500/30"
    >
      <div className={cn('relative p-4 w-full max-h-full', maxWidthClasses[maxWidth], maxHeightClasses['screen'])}>
        <div
          className={cn(
            'relative bg-neutral-primary-soft rounded-[40px] bg-white rounded-base shadow-sm px-8 py-6',
            className,
          )}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
