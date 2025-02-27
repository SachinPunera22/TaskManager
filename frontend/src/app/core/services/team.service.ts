import {HttpClient} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {baseUrl} from '../../environment/env.local';

export interface Team {
  name: string,
  description?: string,
  teamLederId: number,
  employeeIsd: number[]
}

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  private readonly _HttpClient = inject(HttpClient);

  createTeam(team: any): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/teams`,team);
  }

}
