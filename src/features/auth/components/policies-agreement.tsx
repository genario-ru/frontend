import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

const DocumentLink = ({ className, ...props }: LinkComponentProps) => {
  return (
    <Link
      className={cn(
        "hover:text-neutral-12 active:text-neutral-12 focus:text-neutral-12 underline",
        className,
      )}
      {...props}
    />
  );
};

export const PoliciesAgreement = () => {
  return (
    <div className="text-neutral-11 w-full text-center text-xs text-balance">
      Нажимая «Продолжить», вы соглашаетесь с нашими{" "}
      <DocumentLink href="/terms-of-service">
        Условиями пользования
      </DocumentLink>{" "}
      и{" "}
      <DocumentLink href="/privacy-policy">
        Политикой конфиденциальности
      </DocumentLink>
      .
    </div>
  );
};
