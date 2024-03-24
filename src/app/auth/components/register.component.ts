import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { Store } from '@ngrx/store';
import { Register } from '../store/action';
import { selectIsSubmitting } from '../store/reducer';
import { RegisterRequest } from '../types/registerRequest.type';

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ReactiveFormsModule, RouterLink, RouterLinkActive, CommonModule],
})
export class RegisterComponent {
  form = this.fb.nonNullable.group({
    username: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  isSubmitting$ = this.store.select(selectIsSubmitting);

  constructor(private fb: FormBuilder, private store: Store) {}

  onSubmit() {
    const registerRequest: RegisterRequest = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(Register({ request: registerRequest }));
  }
}
