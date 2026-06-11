import type { FC, SVGProps } from "react";

export type PaymentMethodDisplay = {
  title: string;
  icon: FC<SVGProps<SVGElement>>;
};
