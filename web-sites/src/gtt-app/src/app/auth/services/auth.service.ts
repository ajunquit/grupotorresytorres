import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../model/user.model';
import { LoginRequest } from '../model/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl = 'https://localhost:7175/api/auth';

  constructor(private http: HttpClient) {}

  login(request: LoginRequest): Observable<User> {
    const url = `${this.baseUrl}/login`;
    return this.http.post<User>(url, request);
  }
}
