# Contributing to Komdes

Thank you for your interest in contributing to Komdes! To maintain high code quality and automated workflows, we follow a standardized contribution process.

## Development Workflow

### 1. Conventional Commits

We use [Conventional Commits](https://www.conventionalcommits.org/) to automate changelog generation and versioning. Every commit message must follow this format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Common Types:**
- `feat`: A new feature (Minor version bump)
- `fix`: A bug fix (Patch version bump)
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools and libraries

### 2. Using Changesets

We use [Changesets](https://github.com/changesets/changesets) to manage versions and changelogs in our monorepo.

#### Creating a Changeset
Before submitting a Pull Request, you **must** create a changeset if your changes affect the public API or behavior of any package.

```bash
pnpm changeset
```

1. Select the package(s) that were changed.
2. Select the version bump type (patch, minor, major).
3. Provide a summary of the changes.

A new file will be created in the `.changeset` directory. Commit this file with your PR.

## Getting Started

1. Clone the repository: `git clone https://github.com/zakariaakhfas/komdes.git`
2. Install dependencies: `pnpm install`
3. Start development:
   - For components: `pnpm dev:komdes`
   - For documentation: `pnpm dev:docs`

## Documentation

Our documentation is built with [Fumadocs](https://fumadocs.dev/). If you are updating components, please also update the corresponding documentation in the `docs` package.

### Changelog MDX

We maintain a high-level changelog in `docs/src/content/changelog/*.mdx`. These are generated from the automated `CHANGELOG.md` files periodically.
