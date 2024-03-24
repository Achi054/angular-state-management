import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ApiError } from '../../types/apiError.type';

@Component({
  selector: 'auth-error-message',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
  templateUrl: './auth-error-message.component.html',
})
export class AuthErrorMessageComponent implements OnInit {
  @Input() errors: ApiError | null = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    if (this.errors) {
      this.errorMessages = Object.keys(this.errors).map((name) => {
        const message = this.errors && this.errors[name].join(' ');
        return `${name} ${message}`;
      });
    }
  }
}
