import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly AUTH_KEY = 'loggedIn';

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem(this.AUTH_KEY, 'true');
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.AUTH_KEY);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.AUTH_KEY) === 'true';
  }
}