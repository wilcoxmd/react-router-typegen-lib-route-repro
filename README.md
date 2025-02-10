# Typegen + Library Routes Reproduction

This is a bug reproduction repo for [$ReactRouterIssue](). 

## Context

We're migrating an application to React Router 7's new framework features. 

We've migrated from v6 to v7's library mode, and our app currently uses [createBrowserRouter](https://api.reactrouter.com/v7/functions/react_router.createBrowserRouter.html) to set up React Router on the client. Our application routes are split up within in an [NX](https://nx.dev/) monorepo, and teams work on route groups in isolated projects. This allows us easily to split our build, typecheck, test, and other tasks across projects in order speed up our local dev experience and CI. Route groups are built, and then imported into our host application's build process as an npm package. For example: 

```ts
import { teamARoutes } from 'team-a-routes'
import { teamBRoutes } from 'team-b-routes'

const router = createBrowserRouter([teamARoutes, teamBRoutes])
```

We'd like to now migrate away from using `createBrowserRouter` to define our routes, and into a [routes.ts file](https://reactrouter.com/explanation/special-files#routests) in order to start using more framework features. However, we've run into a an issue with the new typegen functionality when attempting this change in our monorepo. 

Presently, the typegen feature in React Router 7 generates Route type definitions into the `.react-router/types` directory, and creates a folder structure that mirrors a project's `appDirectory` structure. However, in a situation like ours, we'd like to import route definitions that live outside the `appDirectory` (i.e. node_modules, a workspace package, etc.). 

Provided a route module path that is outside the current project's app directory, the typegen command's resulting Route types end up being generated outside the `.react-router/types` folder and into a different location on disk. In addition, the generated file attempts to reference the source module via a relative path that won't exist in the host project.  

You can see this issue demonstrated in this repository. 

## Repo structure

This repo is a [pnpm workspace](https://pnpm.io/workspaces).

The workspace contains one React Router 7 app (`apps/test-app`), and one library package (`libs/route-library`) that defines a route module export that is imported into `test-app`'s routes.ts file. The library's build output is a bit contrived here, but should still demonstrate the issue effectively.

## Setup 

Clone this repo and install dependencies with [pnpm](https://pnpm.io/): 

```bash
git clone https://github.com/wilcoxmd/react-router-typegen-lib-route-repro.git react-router-typegen-lib-route-repro
cd react-router-typegen-lib-route-repro
pnpm i
```

## Reproduction steps

1. `cd apps/test-app` to enter the test app project.
1. `pnpm run dev` to start the React Router / Vite dev server and trigger typegen
1. You can view the application on localhost to observe that things work well at runtime.
1. Observe that the library's Route module type definitions have been generated into `apps/test-app/libs/route-library/+types/library-route.ts`. 
    1. This file is not located in the `.react-router/types` folder.
    1. This file attempts to import the source file using `import("../library-route.js")`. `../library-route.js` is not a valid path in the test-app project, and causes `tsc` to fail.
