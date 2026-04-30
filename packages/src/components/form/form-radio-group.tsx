import type * as React from 'react';
import type { ComponentProps } from 'react';
import type { Control, FieldPath, FieldPathValue, FieldValues } from 'react-hook-form';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

type RadioOption<TValue extends string = string> = {
  id: TValue;
  label: string;
  sub?: string;
  icon?: React.ElementType;
};

type FormRadioGroupProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = {
  control: Control<TFieldValues>;
  name: TName;
  options?: readonly RadioOption<FieldPathValue<TFieldValues, TName> & string>[];
  label?: string;
  className?: string;
  radioGroupProps?: Omit<ComponentProps<typeof RadioGroup>, 'value' | 'onValueChange'>;
  renderOption?: (
    option: Readonly<RadioOption<FieldPathValue<TFieldValues, TName> & string>>,
    isSelected: boolean,
  ) => React.ReactNode;
  onValueChange?: (value: FieldPathValue<TFieldValues, TName>) => void;
  layout?: 'vertical' | 'horizontal';
  labelClassName?: string;
};

export function FormRadioGroup<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>({
  control,
  name,
  label,
  options,
  className,
  radioGroupProps,
  renderOption,
  onValueChange,
  layout = 'vertical',
  labelClassName,
}: FormRadioGroupProps<TFieldValues, TName>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn(
            layout === 'horizontal'
              ? 'flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-4 space-y-0'
              : 'space-y-2',
            className,
          )}
        >
          {label && (
            <FormLabel
              className={cn(
                'text-[0.8rem] font-bold text-foreground',
                layout === 'horizontal' && 'sm:w-1/3 sm:shrink-0 sm:pt-2',
                labelClassName,
              )}
            >
              {label}
            </FormLabel>
          )}

          <div className="flex-1 w-full space-y-1.5">
            <FormControl>
              <RadioGroup
                {...radioGroupProps}
                onValueChange={(val) => {
                  field.onChange(val);
                  onValueChange?.(val as FieldPathValue<TFieldValues, TName>);
                }}
                value={field.value as string}
              >
                {options?.map((opt) => {
                  const isSelected = field.value === opt.id;
                  const Icon = opt.icon;

                  return (
                    <div key={opt.id}>
                      <RadioGroupItem
                        className="peer sr-only"
                        id={`${name}-${opt.id}`}
                        value={opt.id}
                      />

                      {renderOption ? (
                        // Custom render – consumer is responsible for the full card
                        <Label htmlFor={`${name}-${opt.id}`}>{renderOption(opt, isSelected)}</Label>
                      ) : (
                        // Default card layout
                        <Label
                          className="flex flex-col items-center justify-center p-3 h-24 border border-border rounded-xl cursor-pointer hover:bg-muted/50 peer-data-[state=checked]:border-primary peer-data-[state=checked]:border-2 peer-data-[state=checked]:bg-primary/5 transition-all text-center gap-1.5"
                          htmlFor={`${name}-${opt.id}`}
                        >
                          {Icon && (
                            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mb-0.5">
                              <Icon className="w-4 h-4 text-foreground/70" />
                            </div>
                          )}

                          <div className="space-y-0.5">
                            <span className="font-bold text-sm text-foreground block leading-none">
                              {opt.label}
                            </span>
                            {opt.sub && (
                              <span className="text-[10px] font-black tracking-wider text-muted-foreground block">
                                {opt.sub}
                              </span>
                            )}
                          </div>
                        </Label>
                      )}
                    </div>
                  );
                })}
              </RadioGroup>
            </FormControl>

            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
}
