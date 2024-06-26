import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "../reducers/auth.reducer";

const selectAuthState = createFeatureSelector<AuthState>("auth");

export const isLoggedIn = createSelector(
  selectAuthState,
  authState => !!authState.user
);

export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);
