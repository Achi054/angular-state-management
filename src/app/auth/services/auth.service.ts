import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CurrentUser } from 'src/app/shared/types/currentUser.type';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../types/authResponse.type';
import { RegisterRequest } from '../types/registerRequest.type';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  register(data: RegisterRequest): Observable<CurrentUser> {
    const url = environment.authApi + '/users/register';
    return this.httpClient.post<AuthResponse>(url, data).pipe(map((res) => res.user));
  }
}
