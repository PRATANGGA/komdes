import { Link } from '@tanstack/react-router';
import { Pre } from 'fumadocs-ui/components/codeblock';
import { Step, Steps } from 'fumadocs-ui/components/steps';
import { TypeTable } from 'fumadocs-ui/components/type-table';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import type { MDXComponents } from 'mdx/types';
import { lazy, Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { FeedbackBlock } from './feedback/client';
import { PropsTable } from './props-table';

const AutoTypeTable = lazy(() =>
  import('./auto-type-table').then((m) => ({ default: m.AutoTypeTable })),
);

const Changelogs = lazy(() => import('./changelogs').then((m) => ({ default: m.Changelogs })));

const CodeBlock = lazy(() => import('./code-block').then((m) => ({ default: m.CodeBlock })));

const ComponentTabs = lazy(() =>
  import('./component-tabs').then((m) => ({ default: m.ComponentTabs })),
);

// const PropsTable = lazy(() => import('./props-table').then((m) => ({ default: m.PropsTable })));

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    ...components,
    AutoTypeTable: ({ ...props }: React.ComponentProps<typeof AutoTypeTable>) => (
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <AutoTypeTable {...props} />
      </Suspense>
    ),
    Changelogs: () => (
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <Changelogs />
      </Suspense>
    ),
    ComponentTabs: ({ ...props }: React.ComponentProps<typeof ComponentTabs>) => (
      <Suspense fallback={<Skeleton className="h-105 w-full rounded-xl" />}>
        <ComponentTabs {...props} />
      </Suspense>
    ),
    FeedbackBlock: ({ children, ...rest }) => (
      <FeedbackBlock {...rest} onSendAction={() => ''}>
        {children}
      </FeedbackBlock>
    ),
    Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
      <Link className={cn('underline underline-offset-4', className)} {...props} />
    ),
    PropsTable: ({ ...props }: React.ComponentProps<typeof PropsTable>) => (
      <PropsTable {...props} />
    ),
    pre: ({ children, ...props }: React.ComponentProps<typeof CodeBlock>) => (
      <Suspense fallback={<Skeleton className="h-64 w-full" />}>
        <CodeBlock {...props}>
          <Pre className="px-4">{children}</Pre>
        </CodeBlock>
      </Suspense>
    ),
    Step,
    Steps,
    TypeTable,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
