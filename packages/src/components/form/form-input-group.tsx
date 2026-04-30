import type { Control, FieldPath, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from '@/components/ui/input-group';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

type FormInputGroupProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  addon?: React.ReactNode;
  inputGroupProps?: React.ComponentProps<typeof InputGroupInput>;
  layout?: 'vertical' | 'horizontal';
  className?: string;
  labelClassName?: string;
};

export function FormInputGroup<T extends FieldValues>({
  control,
  name,
  label,
  addon,
  inputGroupProps,
  layout = 'vertical',
  className,
  labelClassName,
}: FormInputGroupProps<T>) {
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
              <InputGroup>
                <InputGroupInput id={field.name} {...field} {...inputGroupProps} />
                {addon && (
                  <InputGroupAddon>
                    <InputGroupText>{addon}</InputGroupText>
                  </InputGroupAddon>
                )}
              </InputGroup>
            </FormControl>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
