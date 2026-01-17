import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Toggle } from '../toggle/Toggle';

interface ToggleFieldProps<T extends FieldValues> {
  name: FieldPath<T>;
  control: Control<T>;
  label?: string;
  disabled?: boolean;
  className?: string;
}

export const ToggleField = <T extends FieldValues>({
  name,
  control,
  label,
  disabled = false,
  className,
}: ToggleFieldProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <div className={`flex flex-col gap-1 ${className ?? ''}`}>
          <Toggle
            checked={field.value ?? false}
            onChange={field.onChange}
            label={label}
            disabled={disabled}
          />
          {error && <p className="text-xs text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
};
