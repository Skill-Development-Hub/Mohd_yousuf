import { Injectable } from '@angular/core';
import { StudentsService } from '../students.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly SESSION_EXPIRY_TIME = 3600000; // 1 hour in milliseconds (3600 seconds * 1000)
  private readonly TOKEN_KEY = 'auth_token';
  private readonly EXPIRY_KEY = 'auth_token_expiry';

  constructor(
    private StudentsService: StudentsService
  ) {}
  private isBrowser(): boolean {
    // Check if sessionStorage or localStorage is available
    return typeof window !== 'undefined' && typeof window.sessionStorage !== 'undefined';
  }

  login(token: string, creds: any): void {
    if (this.isBrowser()) {
      this.StudentsService.login(creds).subscribe({
        next: (v) => {
          console.log(`observerA: ${v}`);
          const expiryTime = new Date().getTime() + this.SESSION_EXPIRY_TIME;
          sessionStorage.setItem(this.TOKEN_KEY, token); // Store the token
          sessionStorage.setItem(this.EXPIRY_KEY, expiryTime.toString()); // Store the expiry time
        },
        error: (e) =>{
          console.log(e);
        },
        complete: () => console.info('Complete')
      });
    }
  }

  logout(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.EXPIRY_KEY);
  }

  isAuthenticated(): boolean {
    if (!this.isBrowser()) {
      return false; // If we're not in the browser, the user is not authenticated
    }
    
    const expiryTime = sessionStorage.getItem(this.EXPIRY_KEY);
    const token = sessionStorage.getItem(this.TOKEN_KEY);

    // If no token or expired session, return false
    if (!token || !expiryTime) {
      return false;
    }

    const currentTime = new Date().getTime();
    const expiry = parseInt(expiryTime, 10);

    // If current time is past the expiry time, log out the user
    if (currentTime > expiry) {
      this.logout();
      return false;
    }

    return true;
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }
}