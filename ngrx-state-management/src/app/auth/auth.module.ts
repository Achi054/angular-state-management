import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { RouterModule } from "@angular/router";
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AuthGuard } from './auth.gaurd';
import { AuthService } from "./auth.service";
import { AuthEffect } from './effects/auth.effects';
import { LoginComponent } from './login/login.component';
import * as fromAuth from './reducers/auth.reducer';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatCardModule,
        MatInputModule,
        MatButtonModule,
        RouterModule.forChild([{path: '', component: LoginComponent}]),
        StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.authReducer),
        EffectsModule.forFeature([AuthEffect])
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent]
})
export class AuthModule {
    static forRoot(): ModuleWithProviders<AuthModule> {
        return {
            ngModule: AuthModule,
            providers: [
              AuthService,
              AuthGuard
            ]
        }
    }
}
