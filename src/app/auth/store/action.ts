import { createAction, props } from '@ngrx/store';
import { RegisterRequest } from '../types/registerRequest.type';

export const Register = createAction(
  '[Auth] Register',
  props<{ request: RegisterRequest }>()
);
