import { ApiError } from 'src/app/shared/types/apiError.type';
import { CurrentUser } from 'src/app/shared/types/currentUser.type';

export type AuthState = {
  isSubmitting: boolean;
  currentUser: CurrentUser | null | undefined;
  validationErrors: ApiError | null;
};
