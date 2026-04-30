import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import type * as React from 'react';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export const Collapsible = CollapsiblePrimitive.Root;

export const CollapsibleTrigger = CollapsiblePrimitive.CollapsibleTrigger;

export function CollapsibleContent({
  children,
  ...props
}: React.ComponentPropsWithRef<typeof CollapsiblePrimitive.CollapsibleContent>) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <CollapsiblePrimitive.CollapsibleContent
      {...props}
      className={cn(
        'overflow-hidden',
        mounted &&
          'data-[state=closed]:animate-fd-collapsible-up data-[state=open]:animate-fd-collapsible-down',
        props.className,
      )}
    >
      {children}
    </CollapsiblePrimitive.CollapsibleContent>
  );
}

export type CollapsibleProps = CollapsiblePrimitive.CollapsibleProps;
export type CollapsibleContentProps = CollapsiblePrimitive.CollapsibleContentProps;
export type CollapsibleTriggerProps = CollapsiblePrimitive.CollapsibleTriggerProps;
