import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CurrentUser } from 'src/app/shared/types/currentUser.type';
import { AuthService } from '../services/auth.service';
import { authActions } from './action';

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authService = inject(AuthService)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap(({ request }) =>
        authService.register(request).pipe(
          map((currentUser: CurrentUser) => {
            return authActions.registerSuccess({ currentUser });
          }),
          catchError(() => of(authActions.registerFailure()))
        )
      )
    );
  },
  { functional: true }
);
