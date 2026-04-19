import { ArrowLeftIcon } from "lucide-react";

import { useGoBack } from "@/shared/hooks/use-go-back";

import { Button, type ButtonProps } from "../ui/button";

type BackButtonProps = ButtonProps;

export function BackButton(props: BackButtonProps) {
  const onBackButtonClick = useGoBack();

  return (
    <Button
      priority="tertiary"
      icon={<ArrowLeftIcon />}
      onClick={onBackButtonClick}
      {...props}
    />
  );
}
