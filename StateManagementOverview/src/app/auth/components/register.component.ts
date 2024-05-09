import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { AuthErrorMessageComponent } from 'src/app/shared/components/auth-error-message/auth-error-message.component';
import { authActions } from '../store/action';
import { selectIsSubmitting, selectValidationErrors } from '../store/reducer';
import { RegisterRequest } from '../types/registerRequest.type';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule,
    AuthErrorMessageComponent,
    ReactiveFormsModule,
  ],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    apiErrors: this.store.select(selectValidationErrors),
  });

  constructor(
    @Inject('FormBuilder') private fb: FormBuilder,
    private store: Store
  ) {}

  onSubmit() {
    const registerRequest: RegisterRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request: registerRequest }));
  }
}
