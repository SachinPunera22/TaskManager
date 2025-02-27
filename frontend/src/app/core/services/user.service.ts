import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {baseUrl} from '../../environment/env.local';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  private readonly _HttpClient = inject(HttpClient);

  getAllUser(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/users`);
  }

  updateUserById(userId: string, updateRoleDto: { role: string }): Observable<any> {
    return this._HttpClient.put(`${baseUrl}/api/v1/users/${userId}`, updateRoleDto);
  }
}
