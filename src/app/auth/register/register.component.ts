import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ['User']
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      console.warn('Invalid Form:', this.registerForm.value);
      return;
    }

    this.authService.register(this.registerForm.value).subscribe({
      next: res => {
        alert('Registered successfully');
        this.router.navigate(['/login']).then(success => {
          console.log('Navigation to /login was', success ? 'successful' : 'unsuccessful');
        });
      },
      error: err => {
        console.error('Registration failed:', err);
        this.errorMessage = err.error || 'Something went wrong';
        alert('Registration failed: ' + (err.error?.message || JSON.stringify(err.error)));
      }
    });
  }


}
