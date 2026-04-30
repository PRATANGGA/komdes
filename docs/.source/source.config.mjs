// source.config.ts
import { rehypeCode } from "fumadocs-core/mdx-plugins";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";

// src/lib/remark-component.ts
import * as fs from "node:fs";
import * as path from "node:path";
function visit(node, visitor) {
  visitor(node);
  if (node.children) {
    for (const child of node.children) {
      visit(child, visitor);
    }
  }
}
function remarkComponent() {
  return (tree, file) => {
    visit(tree, (node) => {
      if (node.name === "ComponentTabs" && node.type === "mdxJsxFlowElement") {
        const nameAttr = node.attributes?.find(
          (attr) => attr.name === "name"
        );
        if (nameAttr && typeof nameAttr.value === "string") {
          const componentName = nameAttr.value;
          const srcDir = path.resolve(process.cwd(), "src/examples");
          let filePath = path.join(srcDir, `${componentName}.tsx`);
          if (!fs.existsSync(filePath)) {
            filePath = path.join(srcDir, componentName, "index.tsx");
          }
          if (fs.existsSync(filePath)) {
            const sourceCode = fs.readFileSync(filePath, "utf-8");
            const codeNode = {
              type: "code",
              lang: "tsx",
              value: sourceCode
            };
            node.children = node.children || [];
            node.children.push(codeNode);
          }
        }
      }
      if (node.name === "AutoTypeTable" && node.type === "mdxJsxFlowElement") {
        node.name = "auto-type-table";
        const pathAttr = node.attributes?.find(
          (attr) => attr.name === "path"
        );
        if (pathAttr && typeof pathAttr.value === "string") {
          const targetPath = pathAttr.value;
          if (targetPath.startsWith("./types/")) {
            let absoluteTargetPath = path.resolve(
              process.cwd(),
              "src",
              targetPath.replace("./", "")
            );
            if (!fs.existsSync(absoluteTargetPath)) {
              absoluteTargetPath = path.resolve(
                process.cwd(),
                "content/docs",
                targetPath.replace("./", "")
              );
            }
            const mdxDir = file.dirname || path.dirname(file.path || process.cwd());
            let relativePath = path.relative(mdxDir, absoluteTargetPath);
            if (!relativePath.startsWith(".")) {
              relativePath = "./" + relativePath;
            }
            pathAttr.value = relativePath;
          }
        }
      }
    });
  };
}

// source.config.ts
import { remarkAutoTypeTable } from "fumadocs-typescript";
var source_config_default = defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkComponent, [remarkAutoTypeTable]],
    rehypePlugins: [
      [
        rehypeCode,
        {
          // Options for syntax highlighting
          themes: {
            light: "github-light",
            dark: "github-dark"
          },
          // Optional: enable inline code highlighting
          inline: "tailing-curly-colon"
        }
      ]
    ]
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
  }
});
var docs = defineDocs({
  dir: "src/content"
});
export {
  source_config_default as default,
  docs
};
