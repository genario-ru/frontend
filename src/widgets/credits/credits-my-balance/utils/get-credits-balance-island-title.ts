export type CreditsBalanceIslandTitleInput = {
  isMyCreditsBatchesLoading: boolean;
  isMyCreditsBatchesError: boolean;
  totalRemaining: number;
};

export function getCreditsBalanceIslandTitle(
  state: CreditsBalanceIslandTitleInput,
): string {
  if (state.isMyCreditsBatchesLoading || state.isMyCreditsBatchesError) {
    return "Баланс кредитов";
  }

  return `Баланс кредитов: ${state.totalRemaining.toLocaleString("ru-RU")}`;
}
