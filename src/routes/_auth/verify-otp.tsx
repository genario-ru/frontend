import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import * as z from "zod";

import { VerifyOTPComponent } from "@/entrypoints/verify-otp/component";

const verifyOTPSearchSchema = z.object({
  email: z.email(),
  redirect: z.string().optional(),
});

export type VerifyOTPSearch = z.infer<typeof verifyOTPSearchSchema>;

export const Route = createFileRoute("/_auth/verify-otp")({
  validateSearch: zodValidator(verifyOTPSearchSchema),
  component: VerifyOTPComponent,
  errorComponent: () => <div>Provide email</div>,
});
