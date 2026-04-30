import { createFileRoute, notFound } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import browserCollections from 'collections/browser';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { Suspense } from 'react';
import { getMDXComponents } from '@/components/mdx';
// import { getChangelogToc } from '@/lib/changelog';
import { docsOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
// import { Feedback } from '@/components/feedback/client';

export const Route = createFileRoute('/docs/$')({
  component: Page,
  loader: async ({ params }) => {
    const slugs = params._splat?.split('/') ?? [];
    const data = await serverLoader({ data: slugs });
    await clientLoader.preload(data.path);
    return data;
  },
  head: ({ loaderData }) => {
    const title = loaderData?.title ? `${loaderData.title} | Komdes` : 'Komdes Documentation';
    return {
      meta: [
        { title },
        { name: 'description', content: loaderData?.description },
      ],
    };
  },
});

const serverLoader = createServerFn({
  method: 'GET',
})
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const page = source.getPage(slugs);
    if (!page) throw notFound();

    return {
      pageTree: await source.serializePageTree(source.getPageTree()),
      path: page.path,
      title: page.data.title,
      description: page.data.description,
    };
  });

const clientLoader = browserCollections.docs.createClientLoader({
  component(
    { toc, frontmatter, default: MDX },
    // you can define props for the component
    _props: undefined,
  ) {
    // const page = source.getPage(params.slug);
    // const toc = page.url === '/docs/changelog' ? getChangelogToc() : page.data.toc;

    return (
      <DocsPage
        // full={page.data.full}
        breadcrumb={{ enabled: false }}
        tableOfContent={{ style: 'clerk' }}
        toc={toc}
      >
        <DocsTitle>{frontmatter.title}</DocsTitle>
              <DocsDescription>{frontmatter.description}</DocsDescription>
        <DocsBody>
          <MDX components={getMDXComponents()} />
        </DocsBody>
        {/* <Feedback 
          onSendAction={async (feedback) => {
          // await posthog.capture('on_rate_docs', feedback);
        }}
        /> */}

      </DocsPage>
    );
  },
});

function Page() {
  const { pageTree, path } = useFumadocsLoader(Route.useLoaderData());

  return (
    <DocsLayout {...docsOptions} sidebar={{ prefetch: true }} tree={pageTree}>
      <Suspense>{clientLoader.useContent(path)}</Suspense>
    </DocsLayout>
  );
}
