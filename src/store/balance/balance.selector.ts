import type { RootState } from ".."

export const selectBalance = (state: RootState) => state.balance.amount
export const selectBalanceLoading = (state: RootState) => state.balance.isLoading
