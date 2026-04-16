import type { RootState } from ".."

export const selectProfile = (state: RootState) => state.profile.data
export const selectProfileLoading = (state: RootState) => state.profile.isLoading
export const selectProfileError = (state: RootState) => state.profile.error
export const selectFullName = (state: RootState) => {
    const p = state.profile.data
    if (!p) return null
    return `${p.first_name} ${p.last_name}`
}
