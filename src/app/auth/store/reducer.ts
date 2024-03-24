import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthState } from '../types/authState.type';
import { authActions } from './action';

const initialState: AuthState = {
  isSubmitting: false,
  validationErrors: null,
  currentUser: undefined,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({ ...state, isSubmitting: true, currentUser: null })),
    on(authActions.registerSuccess, (state, action) => ({ ...state, isSubmitting: false, currentUser: action.currentUser, validationErrors: null })),
    on(authActions.registerFailure, (state, action) => ({ ...state, isSubmitting: false, validationErrors: action.errors, currentUser: null }))
  ),
});

export const { name: authFeatureKey, reducer: authReducer, selectIsSubmitting, selectCurrentUser, selectValidationErrors } = authFeature;
