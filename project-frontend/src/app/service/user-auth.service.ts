import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor() { }

  public setRoles(roles: []) {
    localStorage.setItem("roles", JSON.stringify(roles));
  }

  public getRoles(): any[] {
    const roles = localStorage.getItem('roles');
    if (roles) {
      return JSON.parse(roles);
    }
    return [];
  }
  
  public setToken(jwtToken: string) {
    localStorage.setItem("jwtToken", jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public setUsername(username: string) {
    localStorage.setItem("username", username);
  }

  public getUsername(): string | null {
    return localStorage.getItem('username');
  }

  public clear() {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isLoggedOut() {
    if (this.getToken() == null) {
      return true;
    } else {
      return false;
    }
  }

  public isAdmin() {
    const roles = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  public isUser() {
    const roles = this.getRoles();
    return roles[0].roleName === 'User';
  }
}
