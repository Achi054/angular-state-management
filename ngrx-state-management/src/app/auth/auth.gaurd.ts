import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthState } from "./reducers/auth.reducer";
import { isLoggedIn } from "./selectors/auth.selector";

@Injectable()
export class AuthGuard
{
  constructor(private store : Store<AuthState>, private router: Router){
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot)
  : Observable<boolean> {
    return this.store
    .select(isLoggedIn)
    .pipe(tap(isloggedIn => {
      if(!isloggedIn) { this.router.navigateByUrl("/login") }
    }))
  }
}
