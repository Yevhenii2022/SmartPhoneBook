export const selectUserName = state => state.auth.user.name;
export const selectUser = state => state.auth.user;
export const selectIsLoggedIn = state => state.auth.isLoaggedIn;
export const selectIsRefreshing = state => state.auth.isRefreshing;
export const selectUserToken = state => state.auth.token;
