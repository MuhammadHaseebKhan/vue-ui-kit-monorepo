# Changesets

Every PR that changes a package's behaviour adds a changeset:

```bash
npm run changeset
```

Pick the affected packages and the semver bump, and write one line for the changelog. On release,
`npm run version-packages` consumes the changesets, bumps versions (including internal
dependencies, so `@vue-ui-kit/ui` always depends on the matching `@vue-ui-kit/tokens`) and writes
each package's `CHANGELOG.md`.
