import { Injectable, OnInit } from '@angular/core';
import { User } from '../../define/user';
import { ACLService } from '@delon/acl';

const ROLE_PREFIX = 'ROLE_';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit {

  constructor(private aclService: ACLService) { }

  saveUser(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.setAcl(user);
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

  getAccessToken(): string {
    return localStorage.getItem('access_token') || '';
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token')
  }

  deleteSession() {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }

  setAcl(user: User) {
    const authorities = user.authorities;
    if (authorities) {
      const roles = authorities.filter(o => o.startsWith(ROLE_PREFIX)).map(o => o.replace(ROLE_PREFIX, ''))
      const permissions = authorities.filter(o => !o.startsWith(ROLE_PREFIX));
      this.aclService.set({
        role: roles,
        ability: permissions
      })
    }
  }

  ngOnInit(): void {
    const user = this.getUser();
    if (user) {
      this.setAcl(user);
    }
  }
}
