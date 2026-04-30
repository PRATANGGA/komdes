import { rehypeCode } from 'fumadocs-core/mdx-plugins';
import { pageSchema } from 'fumadocs-core/source/schema';
import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { remarkAutoTypeTable } from 'fumadocs-typescript';
import z from 'zod';
import { remarkComponent } from './src/lib/remark-component';

export default defineConfig({
  mdxOptions: {
    rehypePlugins: [
      [
        rehypeCode,
        {
          // Optional: enable inline code highlighting
          inline: 'tailing-curly-colon',
          // Options for syntax highlighting
          themes: {
            dark: 'github-dark',
            light: 'github-light',
          },
        },
      ],
    ],
    remarkPlugins: [remarkComponent, [remarkAutoTypeTable]],
    // rehypeCodeOptions: {
    //   theme: "github-light",

    // },
    // rehypePlugins: (plugins) => {
    //   plugins.shift();
    //   plugins.push(rehypeSlug, rehypeComponent, [
    //     rehypePrettyCode,
    //     {
    //       theme: {
    //         dark: "github-dark",
    //         light: "github-light",
    //       },
    //     },
    //   ]);
    //   return plugins;
    // },
    // remarkPlugins: (plugins) => {
    //   plugins.push(
    //     codeImport,
    //     remarkGfm,
    //     remarkMath,
    //     [remarkNpm, { persist: { id: "package-manager" } }],
    //     [remarkDocGen, { generators: [fileGenerator()] }],
    //   );
    //   return plugins;
    // },
  },
});

export const docs = defineDocs({
  dir: 'src/content',
  docs: {
    postprocess: {
      includeProcessedMarkdown: true,
    },
    schema: pageSchema.extend({
      base: z.enum(['radix', 'base']).optional(),
      date: z.coerce.string().optional(),
      links: z
        .object({
          api: z.string().optional(),
          doc: z.string().optional(),
        })
        .optional(),
      preview: z.boolean().optional(),
    }),
  },
});
