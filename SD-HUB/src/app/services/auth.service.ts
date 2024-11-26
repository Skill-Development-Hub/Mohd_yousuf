import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly SESSION_EXPIRY_TIME = 3600000; // 1 hour in milliseconds
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRY_KEY = 'auth_token_expiry';
  private readonly USER_ROLE_KEY = 'user_role';

  constructor(private router: Router) {}

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  }

  signin(token: string, creds: any): void {
    if (this.isBrowser()) {
      const expiryTime = new Date().getTime() + this.SESSION_EXPIRY_TIME;
      sessionStorage.setItem(this.TOKEN_KEY, token);
      sessionStorage.setItem(this.EXPIRY_KEY, expiryTime.toString());
      sessionStorage.setItem(this.USER_ROLE_KEY, creds.role);
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      sessionStorage.removeItem(this.TOKEN_KEY);
      sessionStorage.removeItem(this.EXPIRY_KEY);
      sessionStorage.removeItem(this.USER_ROLE_KEY);
      this.router.navigate(['/signin']);
    }
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) {
      return false;
    }
    
    const expiryTime = sessionStorage.getItem(this.EXPIRY_KEY);
    const token = sessionStorage.getItem(this.TOKEN_KEY);

    if (!token || !expiryTime) {
      return false;
    }

    const currentTime = new Date().getTime();
    const expiry = parseInt(expiryTime, 10);

    if (currentTime > expiry) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.TOKEN_KEY) : null;
  }

  getUserRole(): string | null {
    return this.isBrowser() ? sessionStorage.getItem(this.USER_ROLE_KEY) : null;
  }
}