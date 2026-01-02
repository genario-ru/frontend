import { NeedSupport } from "@/features/auth/components/need-support";
import { WelcomeImage } from "@/features/auth/components/welcome-image";
import { Logo } from "@/shared/components/common/logo";
import { Island, type IslandProps } from "@/shared/components/ui/island";
import { cn } from "@/shared/utils/cn";

export const AuthIsland = ({ className, children, ...props }: IslandProps) => {
  return (
    <Island className={cn("flex-row", className)} {...props}>
      <div className="flex min-h-[584px] flex-1 flex-col justify-between gap-20">
        <Logo href="/sign-in" />
        <section className="flex flex-col gap-6">{children}</section>
        <NeedSupport className="mx-auto" />
      </div>
      <WelcomeImage />
    </Island>
  );
};
