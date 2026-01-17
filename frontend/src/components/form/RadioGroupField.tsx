import { cn } from '@/utils/cn';
import { useRef, type KeyboardEvent, type ReactNode } from 'react';
import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

interface RadioOption {
  value: string | number;
  label: string;
  disabled?: boolean;
  content?: ReactNode;
}

interface RadioGroupFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  options: RadioOption[];
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
}

export const RadioGroupField = <T extends FieldValues>({
  name,
  control,
  label,
  options,
  required = false,
  fullWidth = false,
  disabled = false,
  className,
}: RadioGroupFieldProps<T>) => {
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-2">
          {label && (
            <label className="block text-sm font-medium text-gray-800">
              {label}
              {required && <span className="text-red-500"> *</span>}
            </label>
          )}
          <div className={cn('flex flex-wrap gap-2', className)} role="group" aria-label={label}>
            {options.map((opt, idx) => {
              const isSelected = String(field.value) === String(opt.value);
              const isDisabled = disabled || opt.disabled;
              const renderedContent = opt.content ?? opt.label;
              const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
                const lastIndex = options.length - 1;
                const moveTo = (nextIndex: number) => {
                  const normalized = (nextIndex + options.length) % options.length;
                  const nextValue = String(options[normalized]?.value);
                  field.onChange(nextValue);
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
                    field.onChange(String(opt.value));
                    break;
                  default:
                    break;
                }
              };

              return (
                <button
                  key={`${name}-${String(opt.value)}`}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => !isDisabled && field.onChange(String(opt.value))}
                  disabled={isDisabled}
                  onKeyDown={handleKeyDown}
                  ref={(el) => {
                    optionRefs.current[idx] = el;
                  }}
                  className={cn(
                    'inline-flex items-center justify-center rounded-2xl border px-4 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-[var(--color-focus-ring)] focus:ring-offset-1',
                    fullWidth && 'flex-1',
                    isSelected
                      ? 'border-[#D3BAFF] bg-[#F6EEFF] text-[#8200DB] shadow-[0_8px_24px_rgba(130,0,219,0.12),0_0_0_1px_#E8D9FF]'
                      : 'border-[#D9D9E3] bg-white text-[#1F1F24] hover:border-[#C7C7D7] hover:bg-[#F7F7FB] hover:shadow-[0_6px_16px_rgba(0,0,0,0.05)]',
                    'disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400',
                  )}
                >
                  {renderedContent}
                </button>
              );
            })}
          </div>
          {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};
