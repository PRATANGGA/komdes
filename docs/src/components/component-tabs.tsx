import { Pre } from 'fumadocs-ui/components/codeblock';
import * as React from 'react';
import { MdxTabs, MdxTabsContent, MdxTabsList, MdxTabsTrigger } from '@/components/mdx-tabs';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { CodeBlock } from './code-block';

const exampleComponents = import.meta.glob('../examples/**/*.tsx');
const exampleRawCodes = import.meta.glob('../examples/**/*.tsx', {
  import: 'default',
  query: '?raw',
});

function getExampleComponent(name: string) {
  return React.lazy(async () => {
    const importFn =
      exampleComponents[`../examples/${name}.tsx`] ??
      exampleComponents[`../examples/${name}/index.tsx`];

    if (!importFn) {
      return { default: () => <div>Component "{name}" not found</div> };
    }

    const mod = await importFn();
    return { default: (mod as any).default };
  });
}

function getExampleCodeComponent(name: string) {
  return React.lazy(async () => {
    const importFn =
      exampleRawCodes[`../examples/${name}.tsx`] ??
      exampleRawCodes[`../examples/${name}/index.tsx`];

    if (!importFn) {
      return {
        default: () => (
          <CodeBlock lang="tsx">
            <Pre className="px-4" lang="tsx">{`// Component "${name}" not found`}</Pre>
          </CodeBlock>
        ),
      };
    }

    const result = await importFn();
    const code = (typeof result === 'string' ? result : (result as any).default) as string;
    return {
      default: () => (
        <CodeBlock lang="tsx">
          <Pre className="px-4" lang="tsx">
            {code}
          </Pre>
        </CodeBlock>
      ),
    };
  });
}

interface ComponentTabsProps extends React.ComponentProps<typeof MdxTabs> {
  name: string;
  align?: 'start' | 'center' | 'end';
  preventPreviewFocus?: boolean;
  scalePreview?: boolean;
  fullPreview?: boolean;
}

export function ComponentTabs({
  name,
  children,
  align = 'center',
  preventPreviewFocus,
  scalePreview,
  fullPreview,
  className,
  ...props
}: ComponentTabsProps) {
  const codeNode = React.Children.toArray(children)[0] as React.ReactElement;

  const Component = React.useMemo(() => getExampleComponent(name), [name]);
  const AutoCodeComponent = React.useMemo(() => getExampleCodeComponent(name), [name]);

  const displayedCode = codeNode || (
    <React.Suspense fallback={<Skeleton className="h-[424.5px] w-full" />}>
      <AutoCodeComponent />
    </React.Suspense>
  );

  return (
    <MdxTabs
      className="not-prose gap-0 overflow-hidden rounded-xl border"
      defaultValue="Preview"
      variant="default"
      {...props}
    >
      <div className="flex items-center border-b bg-secondary/50 px-3 py-1.5">
        <MdxTabsList>
          <MdxTabsTrigger value="Preview">Preview</MdxTabsTrigger>
          <MdxTabsTrigger value="Code">Code</MdxTabsTrigger>
        </MdxTabsList>
      </div>
      <MdxTabsContent
        className={cn(
          'not-prose relative',
          preventPreviewFocus && 'focus-visible:outline-hidden focus-visible:ring-0',
        )}
        tabIndex={preventPreviewFocus ? -1 : 0}
        value="Preview"
      >
        <div
          className={cn(
            'flex h-105 w-full justify-center p-10 overflow-y-auto',
            {
              'h-full p-0': fullPreview,
              'items-center': align === 'center',
              'items-end': align === 'end',
              'items-start': align === 'start',
              'sm:p-10': scalePreview,
            },
            className,
          )}
        >
          <React.Suspense fallback={<Skeleton className="size-full" />}>
            <Component />
          </React.Suspense>
        </div>
      </MdxTabsContent>
      <MdxTabsContent
        className="py-0 **:[figure]:my-0 **:[figure]:rounded-none **:[pre]:h-[424.5px] **:[pre]:px-4"
        value="Code"
      >
        {displayedCode}
      </MdxTabsContent>
    </MdxTabs>
  );
}
