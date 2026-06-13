import { ArrowUpRightIcon, LogOutIcon } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/shared/components/ui/button";
import { ButtonLink } from "@/shared/components/ui/button-link";
import { Skeleton } from "@/shared/components/ui/skeleton";

import { useAppWithoutAuthHeaderActions } from "../hooks/use-app-without-auth-header-actions";

export function AppWithoutAuthHeaderActions() {
  const {
    isSessionLoading,
    isLoggedIn,
    homeButtonContent,
    tryButtonContent,
    signOut,
  } = useAppWithoutAuthHeaderActions();

  const body = useMemo(() => {
    if (isSessionLoading) {
      return <AppWithoutAuthHeaderActionsSkeleton />;
    }

    if (isLoggedIn) {
      return (
        <>
          <ButtonLink to="/home" icon={<ArrowUpRightIcon />}>
            {homeButtonContent}
          </ButtonLink>
          <Button variant="negative" icon={<LogOutIcon />} onClick={signOut}>
            Выйти
          </Button>
        </>
      );
    }

    return (
      <>
        <ButtonLink priority="tertiary" to="/sign-in">
          Войти
        </ButtonLink>
        <ButtonLink to="/" hash="tariffs">
          {tryButtonContent}
        </ButtonLink>
      </>
    );
  }, [
    isSessionLoading,
    isLoggedIn,
    homeButtonContent,
    tryButtonContent,
    signOut,
  ]);

  return <div className="flex items-center gap-2 duration-200">{body}</div>;
}

function AppWithoutAuthHeaderActionsSkeleton() {
  return <Skeleton className="rounded-4 h-10 w-40" />;
}
