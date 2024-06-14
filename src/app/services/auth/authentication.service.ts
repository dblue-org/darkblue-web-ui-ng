import { Injectable } from '@angular/core';
import { User } from '../../define/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const userJson = localStorage.getItem('user');
    if (userJson != null) {
      return JSON.parse(userJson);
    } else {
      return null;
    }
  }

  saveAccessToken(token: string) {
    localStorage.setItem('access_token', token);
  }

  isAuthenticated(): boolean {
    return !localStorage.getItem('access_token')
  }
}
