import { createActionGroup, props } from '@ngrx/store';
import { ApiError } from 'src/app/shared/types/apiError.type';
import { CurrentUser } from 'src/app/shared/types/currentUser.type';
import { RegisterRequest } from '../types/registerRequest.type';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    register: props<{ request: RegisterRequest }>(),
    registerSuccess: props<{ currentUser: CurrentUser }>(),
    registerFailure: props<{ errors: ApiError }>(),
  },
});
