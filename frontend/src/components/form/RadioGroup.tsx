'use client';

import { cn } from '@/utils/cn';
import { useRef, type KeyboardEvent } from 'react';

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  label?: string;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
}

export const RadioGroup = ({
  value,
  onChange,
  options,
  label,
  ariaLabel,
  disabled = false,
  className,
}: RadioGroupProps) => {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="block text-sm font-medium text-foreground">{label}</label>
      )}
      <div
        className={cn('flex flex-wrap gap-2', className)}
        role="radiogroup"
        aria-label={ariaLabel ?? label}
      >
        {options.map((opt, idx) => {
          const isSelected = value === opt.value;
          const isDisabled = disabled || opt.disabled;
          const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
            const lastIndex = options.length - 1;
            const moveTo = (nextIndex: number) => {
              const normalized = (nextIndex + options.length) % options.length;
              const nextValue = options[normalized]?.value ?? '';
              onChange(nextValue);
              optionRefs.current[normalized]?.focus();
            };

            switch (event.key) {
              case 'ArrowRight':
              case 'ArrowDown':
                event.preventDefault();
                moveTo(idx + 1);
                break;
              case 'ArrowLeft':
              case 'ArrowUp':
                event.preventDefault();
                moveTo(idx - 1);
                break;
              case 'Home':
                event.preventDefault();
                moveTo(0);
                break;
              case 'End':
                event.preventDefault();
                moveTo(lastIndex);
                break;
              case ' ':
              case 'Enter':
                event.preventDefault();
                onChange(opt.value);
                break;
              default:
                break;
            }
          };

          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => !isDisabled && onChange(opt.value)}
              disabled={isDisabled}
              onKeyDown={handleKeyDown}
              ref={(el) => {
                optionRefs.current[idx] = el;
              }}
              className={cn(
                'inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[#186CFF] focus:ring-offset-1',
                isSelected
                  ? 'border-[#186CFF] bg-[#E9F1FF] text-[#186CFF] shadow-[0_8px_24px_rgba(24,108,255,0.12),0_0_0_1px_#B3D4FF]'
                  : 'border-[#D9D9E3] bg-white text-[#186CFF] hover:border-[#186CFF] hover:bg-[#F3F8FF] hover:shadow-[0_6px_16px_rgba(24,108,255,0.08)]',
                'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400',
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
