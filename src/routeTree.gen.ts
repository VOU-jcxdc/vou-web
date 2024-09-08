/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as AuthenticationImport } from './routes/_authentication'
import { Route as AuthenticatedImport } from './routes/_authenticated'
import { Route as AuthenticatedIndexImport } from './routes/_authenticated/index'
import { Route as AuthenticationSignUpImport } from './routes/_authentication/sign-up'
import { Route as AuthenticationLogInImport } from './routes/_authentication/log-in'
import { Route as AuthenticatedProfileImport } from './routes/_authenticated/profile'
import { Route as AuthenticatedBrandImport } from './routes/_authenticated/_brand'
import { Route as AuthenticatedAdminImport } from './routes/_authenticated/_admin'
import { Route as AuthenticatedBrandInsightsImport } from './routes/_authenticated/_brand/insights'
import { Route as AuthenticatedBrandEventsIndexImport } from './routes/_authenticated/_brand/events/index'
import { Route as AuthenticatedAdminUsersIndexImport } from './routes/_authenticated/_admin/users/index'
import { Route as AuthenticatedAdminGamesIndexImport } from './routes/_authenticated/_admin/games/index'
import { Route as AuthenticatedBrandEventsCreateImport } from './routes/_authenticated/_brand/events/create'
import { Route as AuthenticatedAdminUsersUserIdImport } from './routes/_authenticated/_admin/users/$userId'
import { Route as AuthenticatedAdminGamesGameIdImport } from './routes/_authenticated/_admin/games/$gameId'
import { Route as AuthenticatedBrandEventsEventIdEventIdImport } from './routes/_authenticated/_brand/events/$eventId/_$eventId'
import { Route as AuthenticatedBrandEventsEventIdEventIdIndexImport } from './routes/_authenticated/_brand/events/$eventId/_$eventId/index'
import { Route as AuthenticatedBrandEventsEventIdEventIdVouchersImport } from './routes/_authenticated/_brand/events/$eventId/_$eventId/vouchers'
import { Route as AuthenticatedBrandEventsEventIdEventIdInsightsImport } from './routes/_authenticated/_brand/events/$eventId/_$eventId/insights'
import { Route as AuthenticatedBrandEventsEventIdEventIdGameImport } from './routes/_authenticated/_brand/events/$eventId/_$eventId/game'

// Create Virtual Routes

const AuthenticatedBrandEventsEventIdImport = createFileRoute(
  '/_authenticated/_brand/events/$eventId',
)()

// Create/Update Routes

const AuthenticationRoute = AuthenticationImport.update({
  id: '/_authentication',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedRoute = AuthenticatedImport.update({
  id: '/_authenticated',
  getParentRoute: () => rootRoute,
} as any)

const AuthenticatedIndexRoute = AuthenticatedIndexImport.update({
  path: '/',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticationSignUpRoute = AuthenticationSignUpImport.update({
  path: '/sign-up',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticationLogInRoute = AuthenticationLogInImport.update({
  path: '/log-in',
  getParentRoute: () => AuthenticationRoute,
} as any)

const AuthenticatedProfileRoute = AuthenticatedProfileImport.update({
  path: '/profile',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedBrandRoute = AuthenticatedBrandImport.update({
  id: '/_brand',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedAdminRoute = AuthenticatedAdminImport.update({
  id: '/_admin',
  getParentRoute: () => AuthenticatedRoute,
} as any)

const AuthenticatedBrandInsightsRoute = AuthenticatedBrandInsightsImport.update(
  {
    path: '/insights',
    getParentRoute: () => AuthenticatedBrandRoute,
  } as any,
)

const AuthenticatedBrandEventsEventIdRoute =
  AuthenticatedBrandEventsEventIdImport.update({
    path: '/events/$eventId',
    getParentRoute: () => AuthenticatedBrandRoute,
  } as any)

const AuthenticatedBrandEventsIndexRoute =
  AuthenticatedBrandEventsIndexImport.update({
    path: '/events/',
    getParentRoute: () => AuthenticatedBrandRoute,
  } as any)

const AuthenticatedAdminUsersIndexRoute =
  AuthenticatedAdminUsersIndexImport.update({
    path: '/users/',
    getParentRoute: () => AuthenticatedAdminRoute,
  } as any)

const AuthenticatedAdminGamesIndexRoute =
  AuthenticatedAdminGamesIndexImport.update({
    path: '/games/',
    getParentRoute: () => AuthenticatedAdminRoute,
  } as any)

const AuthenticatedBrandEventsCreateRoute =
  AuthenticatedBrandEventsCreateImport.update({
    path: '/events/create',
    getParentRoute: () => AuthenticatedBrandRoute,
  } as any)

const AuthenticatedAdminUsersUserIdRoute =
  AuthenticatedAdminUsersUserIdImport.update({
    path: '/users/$userId',
    getParentRoute: () => AuthenticatedAdminRoute,
  } as any)

const AuthenticatedAdminGamesGameIdRoute =
  AuthenticatedAdminGamesGameIdImport.update({
    path: '/games/$gameId',
    getParentRoute: () => AuthenticatedAdminRoute,
  } as any)

const AuthenticatedBrandEventsEventIdEventIdRoute =
  AuthenticatedBrandEventsEventIdEventIdImport.update({
    id: '/_$eventId',
    getParentRoute: () => AuthenticatedBrandEventsEventIdRoute,
  } as any)

const AuthenticatedBrandEventsEventIdEventIdIndexRoute =
  AuthenticatedBrandEventsEventIdEventIdIndexImport.update({
    path: '/',
    getParentRoute: () => AuthenticatedBrandEventsEventIdEventIdRoute,
  } as any)

const AuthenticatedBrandEventsEventIdEventIdVouchersRoute =
  AuthenticatedBrandEventsEventIdEventIdVouchersImport.update({
    path: '/vouchers',
    getParentRoute: () => AuthenticatedBrandEventsEventIdEventIdRoute,
  } as any)

const AuthenticatedBrandEventsEventIdEventIdInsightsRoute =
  AuthenticatedBrandEventsEventIdEventIdInsightsImport.update({
    path: '/insights',
    getParentRoute: () => AuthenticatedBrandEventsEventIdEventIdRoute,
  } as any)

const AuthenticatedBrandEventsEventIdEventIdGameRoute =
  AuthenticatedBrandEventsEventIdEventIdGameImport.update({
    path: '/game',
    getParentRoute: () => AuthenticatedBrandEventsEventIdEventIdRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_authenticated': {
      id: '/_authenticated'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedImport
      parentRoute: typeof rootRoute
    }
    '/_authentication': {
      id: '/_authentication'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticationImport
      parentRoute: typeof rootRoute
    }
    '/_authenticated/_admin': {
      id: '/_authenticated/_admin'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedAdminImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_brand': {
      id: '/_authenticated/_brand'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthenticatedBrandImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/profile': {
      id: '/_authenticated/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof AuthenticatedProfileImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authentication/log-in': {
      id: '/_authentication/log-in'
      path: '/log-in'
      fullPath: '/log-in'
      preLoaderRoute: typeof AuthenticationLogInImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authentication/sign-up': {
      id: '/_authentication/sign-up'
      path: '/sign-up'
      fullPath: '/sign-up'
      preLoaderRoute: typeof AuthenticationSignUpImport
      parentRoute: typeof AuthenticationImport
    }
    '/_authenticated/': {
      id: '/_authenticated/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof AuthenticatedIndexImport
      parentRoute: typeof AuthenticatedImport
    }
    '/_authenticated/_brand/insights': {
      id: '/_authenticated/_brand/insights'
      path: '/insights'
      fullPath: '/insights'
      preLoaderRoute: typeof AuthenticatedBrandInsightsImport
      parentRoute: typeof AuthenticatedBrandImport
    }
    '/_authenticated/_admin/games/$gameId': {
      id: '/_authenticated/_admin/games/$gameId'
      path: '/games/$gameId'
      fullPath: '/games/$gameId'
      preLoaderRoute: typeof AuthenticatedAdminGamesGameIdImport
      parentRoute: typeof AuthenticatedAdminImport
    }
    '/_authenticated/_admin/users/$userId': {
      id: '/_authenticated/_admin/users/$userId'
      path: '/users/$userId'
      fullPath: '/users/$userId'
      preLoaderRoute: typeof AuthenticatedAdminUsersUserIdImport
      parentRoute: typeof AuthenticatedAdminImport
    }
    '/_authenticated/_brand/events/create': {
      id: '/_authenticated/_brand/events/create'
      path: '/events/create'
      fullPath: '/events/create'
      preLoaderRoute: typeof AuthenticatedBrandEventsCreateImport
      parentRoute: typeof AuthenticatedBrandImport
    }
    '/_authenticated/_admin/games/': {
      id: '/_authenticated/_admin/games/'
      path: '/games'
      fullPath: '/games'
      preLoaderRoute: typeof AuthenticatedAdminGamesIndexImport
      parentRoute: typeof AuthenticatedAdminImport
    }
    '/_authenticated/_admin/users/': {
      id: '/_authenticated/_admin/users/'
      path: '/users'
      fullPath: '/users'
      preLoaderRoute: typeof AuthenticatedAdminUsersIndexImport
      parentRoute: typeof AuthenticatedAdminImport
    }
    '/_authenticated/_brand/events/': {
      id: '/_authenticated/_brand/events/'
      path: '/events'
      fullPath: '/events'
      preLoaderRoute: typeof AuthenticatedBrandEventsIndexImport
      parentRoute: typeof AuthenticatedBrandImport
    }
    '/_authenticated/_brand/events/$eventId': {
      id: '/_authenticated/_brand/events/$eventId'
      path: '/events/$eventId'
      fullPath: '/events/$eventId'
      preLoaderRoute: typeof AuthenticatedBrandEventsEventIdImport
      parentRoute: typeof AuthenticatedBrandImport
    }
    '/_authenticated/_brand/events/$eventId/_$eventId': {
      id: '/_authenticated/_brand/events/$eventId/_$eventId'
      path: '/events/$eventId'
      fullPath: '/events/$eventId'
      preLoaderRoute: typeof AuthenticatedBrandEventsEventIdEventIdImport
      parentRoute: typeof AuthenticatedBrandEventsEventIdRoute
    }
    '/_authenticated/_brand/events/$eventId/_$eventId/game': {
      id: '/_authenticated/_brand/events/$eventId/_$eventId/game'
      path: '/game'
      fullPath: '/events/$eventId/game'
      preLoaderRoute: typeof AuthenticatedBrandEventsEventIdEventIdGameImport
      parentRoute: typeof AuthenticatedBrandEventsEventIdEventIdImport
    }
    '/_authenticated/_brand/events/$eventId/_$eventId/insights': {
      id: '/_authenticated/_brand/events/$eventId/_$eventId/insights'
      path: '/insights'
      fullPath: '/events/$eventId/insights'
      preLoaderRoute: typeof AuthenticatedBrandEventsEventIdEventIdInsightsImport
      parentRoute: typeof AuthenticatedBrandEventsEventIdEventIdImport
    }
    '/_authenticated/_brand/events/$eventId/_$eventId/vouchers': {
      id: '/_authenticated/_brand/events/$eventId/_$eventId/vouchers'
      path: '/vouchers'
      fullPath: '/events/$eventId/vouchers'
      preLoaderRoute: typeof AuthenticatedBrandEventsEventIdEventIdVouchersImport
      parentRoute: typeof AuthenticatedBrandEventsEventIdEventIdImport
    }
    '/_authenticated/_brand/events/$eventId/_$eventId/': {
      id: '/_authenticated/_brand/events/$eventId/_$eventId/'
      path: '/'
      fullPath: '/events/$eventId/'
      preLoaderRoute: typeof AuthenticatedBrandEventsEventIdEventIdIndexImport
      parentRoute: typeof AuthenticatedBrandEventsEventIdEventIdImport
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  AuthenticatedRoute: AuthenticatedRoute.addChildren({
    AuthenticatedAdminRoute: AuthenticatedAdminRoute.addChildren({
      AuthenticatedAdminGamesGameIdRoute,
      AuthenticatedAdminUsersUserIdRoute,
      AuthenticatedAdminGamesIndexRoute,
      AuthenticatedAdminUsersIndexRoute,
    }),
    AuthenticatedBrandRoute: AuthenticatedBrandRoute.addChildren({
      AuthenticatedBrandInsightsRoute,
      AuthenticatedBrandEventsCreateRoute,
      AuthenticatedBrandEventsIndexRoute,
      AuthenticatedBrandEventsEventIdRoute:
        AuthenticatedBrandEventsEventIdRoute.addChildren({
          AuthenticatedBrandEventsEventIdEventIdRoute:
            AuthenticatedBrandEventsEventIdEventIdRoute.addChildren({
              AuthenticatedBrandEventsEventIdEventIdGameRoute,
              AuthenticatedBrandEventsEventIdEventIdInsightsRoute,
              AuthenticatedBrandEventsEventIdEventIdVouchersRoute,
              AuthenticatedBrandEventsEventIdEventIdIndexRoute,
            }),
        }),
    }),
    AuthenticatedProfileRoute,
    AuthenticatedIndexRoute,
  }),
  AuthenticationRoute: AuthenticationRoute.addChildren({
    AuthenticationLogInRoute,
    AuthenticationSignUpRoute,
  }),
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_authenticated",
        "/_authentication"
      ]
    },
    "/_authenticated": {
      "filePath": "_authenticated.tsx",
      "children": [
        "/_authenticated/_admin",
        "/_authenticated/_brand",
        "/_authenticated/profile",
        "/_authenticated/"
      ]
    },
    "/_authentication": {
      "filePath": "_authentication.tsx",
      "children": [
        "/_authentication/log-in",
        "/_authentication/sign-up"
      ]
    },
    "/_authenticated/_admin": {
      "filePath": "_authenticated/_admin.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_admin/games/$gameId",
        "/_authenticated/_admin/users/$userId",
        "/_authenticated/_admin/games/",
        "/_authenticated/_admin/users/"
      ]
    },
    "/_authenticated/_brand": {
      "filePath": "_authenticated/_brand.tsx",
      "parent": "/_authenticated",
      "children": [
        "/_authenticated/_brand/insights",
        "/_authenticated/_brand/events/create",
        "/_authenticated/_brand/events/",
        "/_authenticated/_brand/events/$eventId"
      ]
    },
    "/_authenticated/profile": {
      "filePath": "_authenticated/profile.tsx",
      "parent": "/_authenticated"
    },
    "/_authentication/log-in": {
      "filePath": "_authentication/log-in.tsx",
      "parent": "/_authentication"
    },
    "/_authentication/sign-up": {
      "filePath": "_authentication/sign-up.tsx",
      "parent": "/_authentication"
    },
    "/_authenticated/": {
      "filePath": "_authenticated/index.tsx",
      "parent": "/_authenticated"
    },
    "/_authenticated/_brand/insights": {
      "filePath": "_authenticated/_brand/insights.tsx",
      "parent": "/_authenticated/_brand"
    },
    "/_authenticated/_admin/games/$gameId": {
      "filePath": "_authenticated/_admin/games/$gameId.tsx",
      "parent": "/_authenticated/_admin"
    },
    "/_authenticated/_admin/users/$userId": {
      "filePath": "_authenticated/_admin/users/$userId.tsx",
      "parent": "/_authenticated/_admin"
    },
    "/_authenticated/_brand/events/create": {
      "filePath": "_authenticated/_brand/events/create.tsx",
      "parent": "/_authenticated/_brand"
    },
    "/_authenticated/_admin/games/": {
      "filePath": "_authenticated/_admin/games/index.tsx",
      "parent": "/_authenticated/_admin"
    },
    "/_authenticated/_admin/users/": {
      "filePath": "_authenticated/_admin/users/index.tsx",
      "parent": "/_authenticated/_admin"
    },
    "/_authenticated/_brand/events/": {
      "filePath": "_authenticated/_brand/events/index.tsx",
      "parent": "/_authenticated/_brand"
    },
    "/_authenticated/_brand/events/$eventId": {
      "filePath": "_authenticated/_brand/events/$eventId",
      "parent": "/_authenticated/_brand",
      "children": [
        "/_authenticated/_brand/events/$eventId/_$eventId"
      ]
    },
    "/_authenticated/_brand/events/$eventId/_$eventId": {
      "filePath": "_authenticated/_brand/events/$eventId/_$eventId.tsx",
      "parent": "/_authenticated/_brand/events/$eventId",
      "children": [
        "/_authenticated/_brand/events/$eventId/_$eventId/game",
        "/_authenticated/_brand/events/$eventId/_$eventId/insights",
        "/_authenticated/_brand/events/$eventId/_$eventId/vouchers",
        "/_authenticated/_brand/events/$eventId/_$eventId/"
      ]
    },
    "/_authenticated/_brand/events/$eventId/_$eventId/game": {
      "filePath": "_authenticated/_brand/events/$eventId/_$eventId/game.tsx",
      "parent": "/_authenticated/_brand/events/$eventId/_$eventId"
    },
    "/_authenticated/_brand/events/$eventId/_$eventId/insights": {
      "filePath": "_authenticated/_brand/events/$eventId/_$eventId/insights.tsx",
      "parent": "/_authenticated/_brand/events/$eventId/_$eventId"
    },
    "/_authenticated/_brand/events/$eventId/_$eventId/vouchers": {
      "filePath": "_authenticated/_brand/events/$eventId/_$eventId/vouchers.tsx",
      "parent": "/_authenticated/_brand/events/$eventId/_$eventId"
    },
    "/_authenticated/_brand/events/$eventId/_$eventId/": {
      "filePath": "_authenticated/_brand/events/$eventId/_$eventId/index.tsx",
      "parent": "/_authenticated/_brand/events/$eventId/_$eventId"
    }
  }
}
ROUTE_MANIFEST_END */
