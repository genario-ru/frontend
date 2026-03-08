import { LogOutIcon } from "lucide-react";

import { useSignOut } from "@/actions/auth/hooks/use-sign-out";
import { CommonHeader } from "@/features/navigation/common-header/components/common-header";
import { Button } from "@/shared/components/ui/button";

export function TariffsHeader() {
  const signOut = useSignOut();

  return (
    <CommonHeader
      right={
        <Button icon={<LogOutIcon />} iconPosition="left" onClick={signOut}>
          Выйти
        </Button>
      }
    />
  );
}
