import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm: FormGroup;
  private authenticatedUser!: User;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get email() {
    return this.loginForm.get('email')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (user) => this.login(user),
        error: (err) => console.error('Error al iniciar sesión:', err),
      });
    }
  }

  private login(user: User): void {
    this.authenticatedUser = user;
    this.persistToken();
    this.redirectTo('/dashboard');
  }

  private persistToken() {
    localStorage.setItem('user', JSON.stringify(this.authenticatedUser));
    localStorage.setItem('token', 'fakeToken');
  }

  private redirectTo(url: string): void {
    this.router.navigate([url]);
  }
}
