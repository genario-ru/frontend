export function getBillingLayoutTitle(pathname: string): string {
  if (pathname.includes("/billing/credits")) {
    return "Баланс и расходы";
  }

  return "Подписка и оплата";
}
