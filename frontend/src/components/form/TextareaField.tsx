import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';

interface TextareaFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

export const TextareaField = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  required = false,
  disabled = false,
  rows = 4,
  className,
}: TextareaFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`space-y-1 ${className ?? ''}`}>
          <label htmlFor={name} className="block text-sm font-medium text-gray-800">
            {label}
            {required && <span className="text-red-500"> *</span>}
          </label>
          <textarea
            id={name}
            {...field}
            placeholder={placeholder}
            disabled={disabled}
            rows={rows}
            aria-invalid={!!error}
            className={`w-full resize-none rounded-lg border px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 transition focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-500 focus:border-red-500 focus:ring-red-200'
                : 'border-gray-300 hover:border-gray-400 focus:border-[var(--color-focus-border)] focus:ring-[var(--color-focus-ring)]'
            } disabled:cursor-not-allowed disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400`}
          />
          {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};
