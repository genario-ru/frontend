import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

import { cn } from "@/shared/utils/cn";

type NeedSupportProps = ComponentProps<"section">;

export const NeedSupport = ({ className, ...props }: NeedSupportProps) => {
  return (
    <section
      className={cn("text-new-neutral-7 w-full text-center text-xs", className)}
      {...props}
    >
      Есть вопросы или нужна помощь?
      <br />
      Наша{" "}
      <Link to="/" className="hover:text-new-neutral-8 underline">
        служба поддержки
      </Link>{" "}
      готова помочь вам.
    </section>
  );
};
