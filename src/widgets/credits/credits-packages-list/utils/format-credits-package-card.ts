import type { CreditsPackageSchema } from "@/codegen/api/product";

import {
  CREDITS_PER_IDEA_ESTIMATE,
  CREDITS_PER_SCENE_PREVIEW_ESTIMATE,
  CREDITS_PER_SCRIPT_ESTIMATE,
} from "../constants/credits-package-metric-ratios";

export type CreditsPackageCardView = {
  id: string;
  title: string;
  priceLabel: string;
  purchaseButtonLabel: string;
  description: string | null;
  metricBadgeLabels: string[];
  isPreferred: boolean;
};

function formatRub(value: number): string {
  return `${value.toLocaleString("ru-RU", { maximumFractionDigits: 0 })} ₽`;
}

export function formatCreditsPackageCard(
  pkg: CreditsPackageSchema,
): CreditsPackageCardView {
  const rubPerCredit = pkg.amount > 0 ? pkg.price / pkg.amount : 0;
  const ideasApprox = Math.floor(pkg.amount / CREDITS_PER_IDEA_ESTIMATE);
  const scriptsApprox = pkg.amount / CREDITS_PER_SCRIPT_ESTIMATE;
  const previewsApprox = Math.floor(
    pkg.amount / CREDITS_PER_SCENE_PREVIEW_ESTIMATE,
  );

  const metricBadgeLabels = [
    `≈${rubPerCredit.toFixed(1)} ₽/кредит`,
    `≈${ideasApprox.toLocaleString("ru-RU")} идей`,
    `≈${scriptsApprox.toLocaleString("ru-RU", { maximumFractionDigits: 1 })} сценариев`,
    `≈${previewsApprox.toLocaleString("ru-RU")} превью сцен`,
  ];

  return {
    id: pkg.id,
    title: `${pkg.amount.toLocaleString("ru-RU")} кредитов`,
    priceLabel: formatRub(pkg.price),
    purchaseButtonLabel: `Купить за ${formatRub(pkg.price)}`,
    description: pkg.description,
    metricBadgeLabels,
    isPreferred: pkg.isPreferred,
  };
}
