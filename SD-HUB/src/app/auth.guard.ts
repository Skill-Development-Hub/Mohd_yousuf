import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.authService.isAuthenticated()) {
        const userRole = this.authService.getUserRole();
        if (state.url.includes('student-dashboard') && userRole !== 'student') {
          this.router.navigate(['/dashboard']);
          return false;
        }
        if (state.url.includes('dashboard') && userRole !== 'admin') {
          this.router.navigate(['/student-dashboard']);
          return false;
        }
        return true;
      } else {
        this.router.navigate(['/signin'], { queryParams: { returnUrl: state.url } });
        return false;
      }
  }
}