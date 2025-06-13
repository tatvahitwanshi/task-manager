
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [CommonModule],
  template: '<p>Logging out...</p>'
})
export class LogoutComponent implements OnInit {
  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.http.post('https://your-api-url/api/auth/logout', {}, { withCredentials: true })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: err => {
          console.error('Logout failed', err);
          this.router.navigate(['/login']);
        }
      });
  }
}
