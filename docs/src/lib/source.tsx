import { docs } from 'collections/server';
import { loader } from 'fumadocs-core/source';
import { Badge } from '@/components/ui/badge';

export const source = loader({
  baseUrl: '/docs',
  plugins: ({ typedPlugin }) => [
    typedPlugin({
      transformPageTree: {
        file(node, file) {
          if (!file) return node;

          const fileData = this.storage.read(file);
          const preview = fileData?.data && 'preview' in fileData.data && fileData.data.preview;

          if (preview) {
            node.name = (
              <>
                {node.name}
                <Badge className="not-prose ml-2 rounded-sm" variant="outline">
                  Preview
                </Badge>
              </>
            );
          }

          return node;
        },
      },
    }),
  ],
  source: docs.toFumadocsSource(),
});
