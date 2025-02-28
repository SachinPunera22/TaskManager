import { baseUrl } from './../../environment/env.local';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);

  register(userData: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/register`, userData);
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/auth/login`, userData);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user') || '{}'); // Assuming user data is stored in localStorage
  }


}
