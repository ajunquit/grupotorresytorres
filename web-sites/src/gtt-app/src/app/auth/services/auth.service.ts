import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { delay, Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private mockUser: User = {
    id: 'u123',
    email: 'admin@admin.com',
    name: 'Administrador',
  };

  login(email: string, password: string): Observable<User> {
    if (email === this.mockUser.email && password === 'admin') {
      return of(this.mockUser).pipe(delay(1000));
    } else {
      return throwError(() => new Error('Credenciales inválidas'));
    }
  }
}
