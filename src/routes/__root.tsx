import { createRootRouteWithContext } from "@tanstack/react-router";

import { RootComponent } from "@/entrypoints/root/component";
import { RootErrorComponent } from "@/entrypoints/root/error-component";
import { RootPendingComponent } from "@/entrypoints/root/pending-component";
import type { RouterContext } from "@/lib/tanstack-router/types";
import { getYMLoaderScript } from "@/lib/yandex-metrika/utils/get-ym-loader-script";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
} from "@/shared/constants/metadata";

export const Route = createRootRouteWithContext<RouterContext>()({
  head: () => {
    return {
      meta: [
        {
          name: "charset",
          content: "UTF-8",
        },
        {
          name: "viewport",
          content:
            "width=device-width, minimum-scale=1, maximum-scale=1, user-scalable=no",
        },
        { title: DEFAULT_TITLE },
        {
          name: "description",
          content: DEFAULT_DESCRIPTION,
        },
      ],
      links: [
        {
          rel: "icon",
          href: "/favicon.ico",
        },
        {
          id: "web-manifest",
          rel: "manifest",
          href: "/manifest.webmanifest",
        },
      ],
      scripts: [
        {
          type: "text/javascript",
          children: getYMLoaderScript(),
        },
      ],
    };
  },
  component: RootComponent,
  pendingComponent: RootPendingComponent,
  errorComponent: RootErrorComponent,
});
