import * as fs from 'node:fs';
import * as path from 'node:path';

function visit(node: any, visitor: (node: any) => void) {
  visitor(node);
  if (node.children) {
    for (const child of node.children) {
      visit(child, visitor);
    }
  }
}

export function remarkComponent() {
  return (tree: any, file: any) => {
    visit(tree, (node) => {
      // Look for ComponentTabs MDX element
      if (node.name === 'ComponentTabs' && node.type === 'mdxJsxFlowElement') {
        const nameAttr = node.attributes?.find((attr: any) => attr.name === 'name');

        if (nameAttr && typeof nameAttr.value === 'string') {
          const componentName = nameAttr.value;

          // Resolve the path to the example file
          const srcDir = path.resolve(process.cwd(), 'src/examples');
          let filePath = path.join(srcDir, `${componentName}.tsx`);
          if (!fs.existsSync(filePath)) {
            filePath = path.join(srcDir, componentName, 'index.tsx');
          }

          if (fs.existsSync(filePath)) {
            const sourceCode = fs.readFileSync(filePath, 'utf-8');

            // Create a markdown code block node containing the source
            const codeNode = {
              lang: 'tsx',
              type: 'code',
              value: sourceCode,
            };

            // Push it into the component's children
            node.children = node.children || [];
            node.children.push(codeNode);
          }
        }
      }

      // Automatically transform AutoTypeTable to the fumadocs-typescript auto-type-table
      if (node.name === 'AutoTypeTable' && node.type === 'mdxJsxFlowElement') {
        node.name = 'auto-type-table';

        const pathAttr = node.attributes?.find((attr: any) => attr.name === 'path');
        if (pathAttr && typeof pathAttr.value === 'string') {
          const targetPath = pathAttr.value;

          // If the user uses a path starting with "./types/" we map it to "src/types/"
          if (targetPath.startsWith('./types/')) {
            let absoluteTargetPath = path.resolve(
              process.cwd(),
              'src',
              targetPath.replace('./', ''),
            );

            // Check if it exists in src, otherwise fallback to content/docs
            if (!fs.existsSync(absoluteTargetPath)) {
              absoluteTargetPath = path.resolve(
                process.cwd(),
                'content/docs',
                targetPath.replace('./', ''),
              );
            }

            // Calculate relative path from the MDX file to the target TS file
            const mdxDir = file.dirname || path.dirname(file.path || process.cwd());
            let relativePath = path.relative(mdxDir, absoluteTargetPath);

            // Ensure relative path starts with ./ or ../
            if (!relativePath.startsWith('.')) {
              relativePath = `./${relativePath}`;
            }
            pathAttr.value = relativePath;
          }
        }
      }
    });
  };
}
