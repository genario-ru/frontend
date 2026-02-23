import { PlusIcon } from "lucide-react";

import { Button, type ButtonProps } from "@/shared/components/ui/button";

type CreateProfileButtonProps = ButtonProps;

export function CreateProfileButton(props: CreateProfileButtonProps) {
  return (
    <Button priority="primary" icon={<PlusIcon />} {...props}>
      Новый профиль
    </Button>
  );
}
