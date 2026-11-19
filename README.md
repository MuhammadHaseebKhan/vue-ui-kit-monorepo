# vue-ui-kit-monorepo

[![CI](https://github.com/MuhammadHaseebKhan/vue-ui-kit-monorepo/actions/workflows/ci.yml/badge.svg)](https://github.com/MuhammadHaseebKhan/vue-ui-kit-monorepo/actions/workflows/ci.yml)
[![Storybook](https://github.com/MuhammadHaseebKhan/vue-ui-kit-monorepo/actions/workflows/storybook.yml/badge.svg)](https://muhammadhaseebkhan.github.io/vue-ui-kit-monorepo/)
![Vue 3](https://img.shields.io/badge/Vue-3.5-42b883)
![License: MIT](https://img.shields.io/badge/license-MIT-green)

A Vue 3 component library in an npm-workspaces monorepo: design tokens, accessible components, Storybook docs with automated accessibility checks, unit tests and versioned releases.

**[Live Storybook →](https://muhammadhaseebkhan.github.io/vue-ui-kit-monorepo/)** Use the toolbar to switch light/dark and left-to-right/right-to-left.

## Packages

| Package | Version | What it is |
|---|---|---|
| [`@vue-ui-kit/tokens`](packages/tokens) | 0.1.0 | Design tokens as CSS custom properties, with light and dark themes |
| [`@vue-ui-kit/ui`](packages/ui) | 0.1.0 | Accessible `UkButton`, `UkTextField` and `UkDialog` components |

## Usage

```ts
// main.ts
import "@vue-ui-kit/tokens/tokens.css";
import "@vue-ui-kit/ui/style.css";
```

```vue
<script setup lang="ts">
import { ref } from "vue";
import { UkButton, UkDialog, UkTextField } from "@vue-ui-kit/ui";

const open = ref(false);
const email = ref("");
</script>

<template>
  <UkButton @click="open = true">Invite…</UkButton>

  <UkDialog v-model:open="open" title="Invite a teammate" :close-on-backdrop="false">
    <UkTextField v-model="email" label="Email address" type="email" required />
    <template #footer="{ close }">
      <UkButton variant="ghost" @click="close">Cancel</UkButton>
      <UkButton @click="close">Send invite</UkButton>
    </template>
  </UkDialog>
</template>
```

## Design decisions

- **Two-tier tokens.** Primitives (`--uk-color-blue-600`) are never used by components. Components read semantic tokens (`--uk-color-accent`), and themes only remap those. Rebranding means overriding variables, not editing component CSS.
- **Theming without JavaScript.** Dark mode follows `prefers-color-scheme`, and an app can pin a theme with `data-uk-theme="light|dark"` on `<html>`. Reduced motion is honoured through a token.
- **RTL by construction.** Components use logical properties (`padding-inline`, `margin-inline-start`, `inline-size`), so they work in Arabic and Hebrew without separate RTL styles.
- **Native platform first.** `UkDialog` wraps `<dialog>` + `showModal()`. Focus containment, Escape, an inert background, the top layer and focus restoration come from the browser instead of a hand-rolled focus trap. `v-model:open` stays in sync when the browser closes it.
- **Accessible states.** A loading `UkButton` uses `aria-busy` + `aria-disabled` and stays focusable instead of vanishing from the tab order. `UkTextField` requires a visible label, and wires error and hint text through `aria-describedby`, error first.
- **Library build.** Vite library mode with Vue as an external peer dependency, generated `.d.ts` files and a single CSS file.

## Development

```bash
npm install
npm test                               # Vitest + Vue Test Utils (23 tests)
npm run typecheck                      # vue-tsc
npm run lint                           # ESLint (flat config, Vue + TypeScript)
npm run build                          # build all packages
npm run storybook -w packages/ui       # Storybook on http://localhost:6006
```

## Releasing

Versions and changelogs are managed with [Changesets](https://github.com/changesets/changesets):

```bash
npm run changeset          # describe a change and pick the semver bump
npm run version-packages   # apply changesets: bump versions, update internal deps, write CHANGELOG.md
```

CI runs lint, type-check, tests, build and gitleaks secret scanning on every push. Storybook is rebuilt and published to GitHub Pages on every push to `main`.

## License

[MIT](LICENSE)
