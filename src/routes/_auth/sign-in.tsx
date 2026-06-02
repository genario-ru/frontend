import { createFileRoute, redirect } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-adapter";

import {
  getApiV1AuthSessionQueryOptions,
  getApiV1SubscriptonsMyQueryOptions,
} from "@/codegen/api/product";
import { SignInComponent } from "@/entrypoints/sign-in/component";
import { z } from "@/lib/zod";
import { checkHasActiveSubscription } from "@/shared/utils/subscriptions/check-has-active-subscription";

const signInSearchSchema = z.object({
  email: z.email().optional(),
  redirect: z.string().optional(),
});

export type SignInSearch = z.infer<typeof signInSearchSchema>;

export const Route = createFileRoute("/_auth/sign-in")({
  validateSearch: zodValidator(signInSearchSchema),
  beforeLoad: async ({ context }) => {
    const sessionData = await context.queryClient.ensureQueryData(
      getApiV1AuthSessionQueryOptions(),
    );

    if (!sessionData) {
      return {
        ...context,
        sessionData,
      };
    }

    const subscriptions = await context.queryClient.ensureQueryData({
      ...getApiV1SubscriptonsMyQueryOptions(),
    });

    const hasActiveSubscription = checkHasActiveSubscription(
      subscriptions.data,
    );

    if (hasActiveSubscription) {
      throw redirect({
        replace: true,
        to: "/home",
      });
    }

    throw redirect({
      replace: true,
      to: "/tariffs",
    });
  },
  component: SignInComponent,
});
