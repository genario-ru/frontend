import { createFileRoute } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";
import { object, string } from "zod";

import { VerifyOTPComponent } from "@/entrypoints/verify-otp/component";

export const Route = createFileRoute("/_auth/verify-otp")({
  validateSearch: zodValidator(
    object({
      email: string().email(),
      redirect: string().optional(),
    }),
  ),
  component: VerifyOTPComponent,
  errorComponent: () => <div>Provide email</div>,
});
