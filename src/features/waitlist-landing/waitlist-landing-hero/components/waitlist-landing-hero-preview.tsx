import { SparklesIcon } from "lucide-react";

import { Island } from "@/shared/components/ui/island";
import { Item } from "@/shared/components/ui/item";
import { cn } from "@/shared/utils/cn";

import {
  WAITLIST_LANDING_HERO_PREVIEW_TITLE,
  waitlistLandingHeroPreviewItems,
} from "../constants/waitlist-landing-hero-preview-items";

export function WaitlistLandingHeroPreview() {
  return (
    <div className="relative w-full max-w-xl justify-self-center lg:justify-self-end">
      <div className="bg-accent-4/20 absolute inset-y-8 -right-4 left-10 rotate-3 blur-2xl" />
      <div className="rounded-6 border-neutral-1/15 bg-neutral-1/10 shadow-bottom-2 dark:border-neutral-8/15 dark:bg-neutral-8/10 relative overflow-hidden border p-3 backdrop-blur-xl">
        <Island>
          <div className="flex items-start justify-between gap-4">
            <p className="max-w-sm text-lg leading-tight font-semibold sm:text-xl">
              {WAITLIST_LANDING_HERO_PREVIEW_TITLE}
            </p>
            <SparklesIcon className="text-accent-7 size-6 shrink-0" />
          </div>
          <div className="flex w-full flex-col gap-2">
            {waitlistLandingHeroPreviewItems.map(
              ({ icon: Icon, label, value, color }) => (
                <Item
                  key={`waitlist-landing-hero-preview-${label}`}
                  icon={<Icon className={cn("size-6 shrink-0", color)} />}
                  title={label}
                  description={value}
                />
              ),
            )}
          </div>
        </Island>
      </div>
    </div>
  );
}
