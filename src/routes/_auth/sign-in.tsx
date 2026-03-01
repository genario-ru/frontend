import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import { SignInComponent } from "@/entrypoints/sign-in/component";
import { z } from "@/lib/zod";

const signInSearchSchema = z.object({
  email: z.email().optional(),
  redirect: z.string().optional(),
});

export type SignInSearch = z.infer<typeof signInSearchSchema>;

export const Route = createFileRoute("/_auth/sign-in")({
  validateSearch: zodValidator(signInSearchSchema),
  component: SignInComponent,
});
