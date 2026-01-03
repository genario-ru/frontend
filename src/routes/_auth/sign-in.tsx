import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { email, object, string } from "zod";

import { SignInComponent } from "@/entrypoints/sign-in/component";

export const Route = createFileRoute("/_auth/sign-in")({
  validateSearch: zodValidator(
    object({
      email: email().optional(),
      redirect: string().optional(),
    }),
  ),
  component: SignInComponent,
});
