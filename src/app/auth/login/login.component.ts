import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError } from '@angular/material/form-field';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule,  RouterModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatError]
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;


    console.log('Login Attempt:', this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Logged in', res);

        if (res.role === 'Admin') {
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 200);
        } else if (res.role === 'User') {
          setTimeout(() => {
            this.router.navigate(['/tasks']);
          }, 200);
        }
      },
      error: (err) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }

}
