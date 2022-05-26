# Gigapipe actions and workflows

This monorepo contains several actions that are used across the different organization' projects.

It also contains some workflow templates to make it easier to bootstrap the CI/CD automation for new projects.

## Repo structure

The monorepo uses [PNPM Workspaces](https://pnpm.io/workspaces) to manage packages and dependencies and [TurboRepo](https://turborepo.org/) as the tasks orchestration tool. This is the structure:

```
.
├── actions
│   ├── changelog-reader
│   │   ├── Contains the source code for the changelog-reader action.
├── workflows
│   ├── pr-automation
│   │   ├── Contains examples of workflows used for pull request automation.
│
├── configs
│   ├── eslint
│   │   └── Contains the shared ESLint configuration for all the actions.
│   └── tsconfig
│        └── Contains the shared Typescript configuration for all the actions.

├── turbo.json: config file for TurboRepo tool
├── pnpm-workspae.yaml: config file to define workspace packages.

```

## Pre-requisits

Make sure you have Node 16.15.0 installed. If you have [nvm](https://github.com/nvm-sh/nvm) just run `nvm install` from the root of the project.

Install PNPM using:

```
corepack enable

corepack prepare pnpm@7.1.5 --activate

```

## Develop

From the root of the repo run `pnpm install` to install all the dependencies.

Work in your action as an isolated package. To install new dependencies just run `pnpm add NEW_DEPENDENCY` from the action folder.

## Test

From the root of the repo run `pnpm test` to execute the tests for all packages.

## Build

From the root of the repo run `pnpm build` to build and pack all the actions into its `dist` folder. Each action needs to have a `dist` folder with an `index.js` file containing all the code required to execute and referenced in the `main` key of its own `package.json`.

The build command uses [@vercel/ncc](https://github.com/vercel/ncc) to transpile, bundle and minify all the source code.
