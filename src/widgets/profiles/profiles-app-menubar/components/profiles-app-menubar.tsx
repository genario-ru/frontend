import type { ReactNode } from "react";

import { AppMenubar } from "@/features/navigation/app-menubar/components/app-menubar";

type ProfilesAppMenubarProps = {
  newProfileDialog: ReactNode;
};

export function ProfilesAppMenubar({
  newProfileDialog,
}: ProfilesAppMenubarProps) {
  return <AppMenubar title="Профили" right={newProfileDialog} />;
}
