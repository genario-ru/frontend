import type { ComponentProps } from "react";

import { CRLF, SPACE } from "@/shared/constants/unicode";
import { cn } from "@/shared/utils/cn";

type NeedSupportProps = ComponentProps<"section">;

export const NeedSupport = ({ className, ...props }: NeedSupportProps) => {
  return (
    <section
      className={cn(
        "text-neutral-7 w-full text-center text-sm whitespace-pre-line",
        className,
      )}
      {...props}
    >
      Есть вопросы или нужна помощь?{CRLF}Наша{SPACE}
      <a
        href="mailto:support@genario.ru"
        className="hover:text-neutral-8 underline"
      >
        служба поддержки
      </a>
      {SPACE}готова помочь вам.
    </section>
  );
};
