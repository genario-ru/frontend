import { WelcomeImage } from "@/features/auth/components/welcome-image";
import { LogoLink } from "@/shared/components/common/logo-link";
import { NeedSupport } from "@/shared/components/common/need-support";
import { Island, type IslandProps } from "@/shared/components/ui/island";
import { useBreakpoints } from "@/shared/hooks/use-breakpoints";
import { cn } from "@/shared/utils/cn";

export const AuthIsland = ({ className, children, ...props }: IslandProps) => {
  const { isMobile } = useBreakpoints();

  return (
    <Island
      roundedTop={!isMobile}
      roundedBottom={!isMobile}
      className={cn(
        "grid h-full gap-6 p-6 md:h-auto md:grid-cols-2",
        className,
      )}
      {...props}
    >
      <div className="flex min-h-[520px] flex-col justify-between gap-20">
        <LogoLink href="/" />
        <section className="flex flex-col gap-6">{children}</section>
        <NeedSupport className="mx-auto" />
      </div>
      {!isMobile && <WelcomeImage />}
    </Island>
  );
};
