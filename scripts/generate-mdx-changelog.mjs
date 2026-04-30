import fs from 'node:fs';
import path from 'node:path';

/**
 * A simple script to convert standard CHANGELOG.md entries to Fumadocs MDX format.
 * This is a starting point for automation.
 */

const PACKAGE_CHANGELOG = './packages/CHANGELOG.md'; // Adjust path if needed
const OUTPUT_DIR = './docs/src/content/changelog';

if (!fs.existsSync(PACKAGE_CHANGELOG)) {
  console.error('CHANGELOG.md not found at', PACKAGE_CHANGELOG);
  process.exit(1);
}

const content = fs.readFileSync(PACKAGE_CHANGELOG, 'utf-8');

// Regex to find the latest version block
// Assumes format: ## [1.2.3] - 2024-01-01
const versionRegex = /## \[([\d.]+)\] - (\d{4}-\d{2}-\d{2})([\s\S]*?)(?=## \[|$)/g;
const match = versionRegex.exec(content);

if (match) {
  const version = match[1];
  const date = match[2];
  const body = match[3].trim();

  const title = `Release v${version}`;
  const description = `Update for version ${version} shipped on ${date}.`;

  const mdxContent = `---
title: ${title}
description: ${description}
date: ${date}
---

${body}
`;

  const fileName = `${date}-v${version.replace(/\./g, '-')}.mdx`;
  const outputPath = path.join(OUTPUT_DIR, fileName);

  fs.writeFileSync(outputPath, mdxContent);
  console.info(`Generated MDX changelog: ${outputPath}`);
} else {
  console.info('No version entries found in CHANGELOG.md');
}
