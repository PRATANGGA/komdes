import type { ComponentProps, ElementType, ReactNode } from 'react';

/**
 * Type stub for React Hook Form's Control object.
 */
export type Control = object;

/**
 * Props accepted by the `FormInput` component.
 */
export interface FormInputProps {
  /**
   * The React Hook Form `control` object returned by `useForm`.
   */
  control: Control;

  /**
   * Dot-notation path to the field inside the form schema.
   * Fully type-safe — TypeScript will error if the path does not exist.
   */
  name: string;

  /**
   * Optional label rendered above the input using a `<Label>` element.
   * Omit to render the field without a visible label.
   */
  label?: string;

  /**
   * Props forwarded directly to the underlying `<Input>` element.
   * RHF field props (`value`, `onChange`, `onBlur`, `ref`) are already
   * spread by the component — use this for native attributes like
   * `type`, `placeholder`, `disabled`, `autoComplete`, etc.
   */
  inputProps?: ComponentProps<'input'>;

  /**
   * Layout orientation of the form item.
   * - `vertical`: Label is stacked above the input (default).
   * - `horizontal`: Label is placed side-by-side with the input.
   *
   * @default "vertical"
   */
  layout?: 'vertical' | 'horizontal';

  /**
   * Additional class names applied to the outermost `FormItem` wrapper.
   */
  className?: string;

  /**
   * Additional class names applied to the `Label` element.
   * Useful for adjusting the label width in horizontal layout (e.g. `sm:w-1/4`).
   */
  labelClassName?: string;
}

/**
 * Props accepted by the `FormSwitch` component.
 */
export interface FormSwitchProps {
  /**
   * The React Hook Form `control` object returned by `useForm`.
   */
  control: Control;

  /**
   * Dot-notation path to the boolean field inside the form schema.
   * Fully type-safe — TypeScript will error if the path does not exist.
   */
  name: string;

  /**
   * Primary label shown next to the switch.
   * In `"inline"` layout this appears on the left side.
   * In `"default"` layout this appears above the switch.
   */
  label?: string;

  /**
   * Optional secondary description rendered below the label.
   * Only visible in `"inline"` layout.
   */
  description?: string;

  /**
   * Controls the visual layout of the component.
   *
   * - `"default"` _(default)_ — label stacked above the switch, similar to other form fields.
   * - `"inline"` — label + description on the left, switch on the right inside a card-like row.
   *
   * @default "default"
   */
  layout?: 'default' | 'inline';

  /**
   * Additional class names applied to the outermost `FormItem` wrapper.
   */
  className?: string;

  /**
   * Additional class names applied to the `Label` element.
   * Useful for adjusting the label width in inline layout (e.g. `sm:w-1/4`).
   */
  labelClassName?: string;

  /**
   * Props forwarded to the underlying `<Switch>` element.
   * `checked` and `onCheckedChange` are managed internally by React Hook Form.
   */
  switchProps?: ComponentProps<'button'>;
}

/**
 * Props accepted by the `FormInputGroup` component.
 */
export interface FormInputGroupProps {
  /**
   * The React Hook Form `control` object returned by `useForm`.
   */
  control: Control;

  /**
   * Dot-notation path to the field inside the form schema.
   * Fully type-safe — TypeScript will error if the path does not exist.
   */
  name: string;

  /**
   * Optional label rendered above the input group using a `<Label>` element.
   * Omit to render the field without a visible label.
   */
  label?: string;

  /**
   * Content rendered inside the right-side addon of the input group.
   * Accepts any React node — typically a currency symbol, unit, or icon.
   * When omitted, no addon is rendered.
   */
  addon?: ReactNode;

  /**
   * Props forwarded to the underlying `<InputGroupInput>` element.
   * RHF field props (`value`, `onChange`, `onBlur`, `ref`) are already
   * spread by the component.
   */
  inputGroupProps?: ComponentProps<'input'>;

  /**
   * Layout orientation of the form item.
   * - `vertical`: Label is stacked above the input (default).
   * - `horizontal`: Label is placed side-by-side with the input.
   *
   * @default "vertical"
   */
  layout?: 'vertical' | 'horizontal';

  /**
   * Additional class names applied to the outermost `FormItem` wrapper.
   */
  className?: string;

  /**
   * Additional class names applied to the `Label` element.
   * Useful for adjusting the label width in horizontal layout (e.g. `sm:w-1/4`).
   */
  labelClassName?: string;
}

/**
 * Represents a single selectable option in `FormRadioGroup`.
 */
export interface RadioOption {
  /** The value written into the form field when this option is selected. */
  id: string;
  /** Primary human-readable label displayed on the card. */
  label: string;
  /** Optional secondary label (e.g. a region or category badge). */
  sub?: string;
  /** Optional Lucide icon or any React component rendered inside the card. */
  icon?: ElementType;
}

/**
 * Props accepted by the `FormRadioGroup` component.
 */
export interface FormRadioGroupProps {
  /**
   * The React Hook Form `control` object returned by `useForm`.
   */
  control: Control;

  /**
   * Dot-notation path to the field inside the form schema.
   * Fully type-safe — TypeScript will error if the path does not exist.
   */
  name: string;

  /**
   * Array of options to render as selectable cards.
   * Accepts both `readonly` (e.g. `as const`) and mutable arrays.
   */
  options?: RadioOption[];

  /**
   * Optional label rendered above the radio group using `FormLabel`.
   * Omit to render the group without a visible label.
   */
  label?: string;

  /**
   * Additional class names applied to the outermost `FormItem` wrapper.
   * Use this to control spacing, width, etc.
   */
  className?: string;

  /**
   * Props forwarded to the underlying `RadioGroup` (Radix UI primitive).
   * `value` and `onValueChange` are omitted as they are managed internally
   * by React Hook Form.
   */
  radioGroupProps?: ComponentProps<'div'>;

  /**
   * Custom render function for each option card.
   * When provided it **replaces** the default card layout entirely.
   * The wrapping `<Label htmlFor={...}>` is still provided by the component,
   * so you only need to return the inner content.
   */
  renderOption?: (option: RadioOption, isSelected: boolean) => ReactNode;

  /**
   * Called **after** `field.onChange` whenever the selected value changes.
   * Use this for side-effects that should not live inside the form schema,
   * such as resetting dependent fields.
   */
  onValueChange?: (value: string) => void;

  /**
   * Layout orientation of the form item.
   * - `vertical`: Label is stacked above the options (default).
   * - `horizontal`: Label is placed side-by-side with the options.
   *
   * @default "vertical"
   */
  layout?: 'vertical' | 'horizontal';

  /**
   * Additional class names applied to the `FormLabel` element.
   * Useful for adjusting the label width in horizontal layout (e.g. `sm:w-1/4`).
   */
  labelClassName?: string;
}
