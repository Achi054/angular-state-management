import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, logout } from './auth/actions/auth.actions';
import { AuthState } from './auth/reducers/auth.reducer';
import { isLoggedIn, isLoggedOut } from './auth/selectors/auth.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    loading = true;
    isLoggedIn$: Observable<boolean>;
    isLoggedOut$: Observable<boolean>;

    constructor(private router: Router, private store: Store<AuthState>) {}

    ngOnInit() {
      const userProfile = localStorage.getItem('user');
      if(userProfile){
        this.store.dispatch(login({ user: JSON.parse(userProfile) }));
      }

      this.router.events.subscribe(event  => {
        switch (true) {
          case event instanceof NavigationStart: {
            this.loading = true;
            break;
          }

          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
            this.loading = false;
            break;
          }
          default: {
            break;
          }
        }
      });

      this.isLoggedIn$ = this.store.select(isLoggedIn);
      this.isLoggedOut$ = this.store.select(isLoggedOut);
    }

    logout() {
      this.store.dispatch(logout());
    }

}
