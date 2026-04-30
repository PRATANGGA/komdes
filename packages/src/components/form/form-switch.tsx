import type * as React from 'react';
import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

type FormSwitchProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  layout?: 'default' | 'inline';
  className?: string;
  labelClassName?: string;
  switchProps?: Omit<React.ComponentProps<typeof Switch>, 'checked' | 'onCheckedChange'>;
};

export function FormSwitch<T extends FieldValues>({
  control,
  name,
  label,
  description,
  layout = 'default',
  className,
  labelClassName,
  switchProps,
}: FormSwitchProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const switchEl = (
          <FormControl>
            <Switch
              {...switchProps}
              checked={Boolean(field.value)}
              onCheckedChange={field.onChange}
            />
          </FormControl>
        );

        if (layout === 'inline') {
          return (
            <FormItem
              className={cn(
                className ??
                  'flex flex-row items-center justify-between rounded-lg border p-3 bg-muted/30',
              )}
            >
              <div className={cn('space-y-0.5', labelClassName)}>
                {label && <FormLabel className="text-sm font-medium">{label}</FormLabel>}
                {description && <p className="text-xs text-muted-foreground">{description}</p>}
              </div>
              {switchEl}
              <FormMessage />
            </FormItem>
          );
        }

        // Default: stacked label above switch
        return (
          <FormItem className={className}>
            {label && <FormLabel>{label}</FormLabel>}
            {switchEl}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
