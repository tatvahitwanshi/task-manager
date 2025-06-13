import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private http: HttpClient) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.http.get<any>('http://localhost:5223/api/Auth/validate', { withCredentials: true }).pipe(
      map((res) => {
        const requiredRole = route.data['role'];
        if (requiredRole && res.role !== requiredRole) {
          this.router.navigate(['/error']);
          return false;
        }
        return true;
      }),
      catchError(() => {
        this.router.navigate(['/login']);
        return of(false);
      })
    );
  }
}
