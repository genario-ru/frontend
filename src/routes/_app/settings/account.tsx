import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { boolean, object } from "zod";

import { AccountSettingsComponent } from "@/entrypoints/account-settings/component";

export const Route = createFileRoute("/_app/settings/account")({
  validateSearch: zodValidator(
    object({
      disableSessionCookieCache: boolean().optional(),
    }),
  ),
  component: AccountSettingsComponent,
});
