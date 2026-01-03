import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { boolean, email, object, string } from "zod";

import { SignInComponent } from "@/entrypoints/sign-in/component";

export const Route = createFileRoute("/_auth/sign-in")({
  validateSearch: zodValidator(
    object({
      email: email().optional(),
      redirect: string().optional(),
      signOut: boolean().optional(),
    }),
  ),
  component: SignInComponent,
});
