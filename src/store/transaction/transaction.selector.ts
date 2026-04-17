import type { RootState } from ".."

export const selectTransactionRecords = (state: RootState) => state.transaction.records
export const selectTransactionLoading = (state: RootState) => state.transaction.isLoading
export const selectTransactionHasMore = (state: RootState) => state.transaction.hasMore
export const selectTransactionOffset = (state: RootState) => state.transaction.offset
