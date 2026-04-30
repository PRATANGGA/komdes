import { Link } from '@tanstack/react-router';
import defaultComponents from 'fumadocs-ui/mdx';
import { Separator } from '@/components/ui/separator';
import { getChangelogPages } from '@/lib/changelog';

export function Changelogs() {
  const pages = getChangelogPages();

  return (
    <div className="flex flex-col">
      {pages.map((page) => {
        const MDX = page.data.body;
        const slug = page.slugs[page.slugs.length - 1];
        const date = page.date
          ? page.date.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : null;

        return (
          <article className="mb-12" key={page.url}>
            <Link className="no-underline hover:underline" to={page.url}>
              <h2 className="not-prose font-semibold text-2xl tracking-tight" id={slug}>
                {page.data.title}
              </h2>
            </Link>
            {date && <p className="not-prose mt-1 text-muted-foreground text-sm">{date}</p>}
            <div className="prose dark:prose-invert mt-6 *:first:mt-0">
              <MDX components={defaultComponents} />
            </div>
            <Separator className="mt-12" />
          </article>
        );
      })}
    </div>
  );
}
