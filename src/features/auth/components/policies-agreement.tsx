import { Link, type LinkComponentProps } from "@tanstack/react-router";

import { cn } from "@/shared/utils/cn";

const DocumentLink = ({ className, ...props }: LinkComponentProps) => {
  return (
    <Link
      className={cn(
        "hover:text-neutral-8 active:text-neutral-8 focus:text-neutral-8 underline",
        className,
      )}
      {...props}
    />
  );
};

export const PoliciesAgreement = () => {
  return (
    <div className="text-neutral-7 w-full text-center text-xs text-balance">
      Нажимая «Продолжить», вы соглашаетесь с нашими{" "}
      <DocumentLink to="/legal/$slug" params={{ slug: "terms" }}>
        Условиями пользования
      </DocumentLink>
      ,{" "}
      <DocumentLink to="/legal/$slug" params={{ slug: "offer" }}>
        публичной офертой
      </DocumentLink>{" "}
      и{" "}
      <DocumentLink to="/legal/$slug" params={{ slug: "privacy" }}>
        Политикой конфиденциальности
      </DocumentLink>
      .
    </div>
  );
};
