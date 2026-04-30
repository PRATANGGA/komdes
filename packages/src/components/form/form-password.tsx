import type React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import type { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PasswordInput } from '../password-input';

type FormInputPasswordProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  inputProps?: React.ComponentProps<typeof Input>;
  layout?: 'vertical' | 'horizontal';
  className?: string;
  labelClassName?: string;
};

export function FormInputPassword<T extends FieldValues>({
  control,
  name,
  label,
  inputProps,
  layout = 'vertical',
  className,
  labelClassName,
}: FormInputPasswordProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            layout === 'horizontal'
              ? 'flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 space-y-0'
              : 'space-y-2',
            className,
          )}
        >
          {label && (
            <Label
              className={cn(layout === 'horizontal' && 'sm:w-1/3 sm:shrink-0', labelClassName)}
              htmlFor={field.name}
            >
              {label}
            </Label>
          )}
          <div className="flex-1 w-full space-y-1.5">
            <FormControl>
              <PasswordInput id={field.name} {...field} {...inputProps} />
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
