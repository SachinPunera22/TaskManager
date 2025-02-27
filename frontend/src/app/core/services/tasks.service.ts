import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { baseUrl } from '../../environment/env.local';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor() { }
  private readonly _HttpClient = inject(HttpClient);
  
  getAllUserTasks(): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/tasks`);
  }

  getTaskById(taskId: string): Observable<any> {
    return this._HttpClient.get(`${baseUrl}/api/v1/tasks/${taskId}`);
  }

  createTask(taskData: object): Observable<any> {
    return this._HttpClient.post(`${baseUrl}/api/v1/tasks`, taskData);
  }

  updateTaskById(taskId: string, taskData: object): Observable<any> {
    return this._HttpClient.patch(`${baseUrl}/api/v1/tasks/${taskId}`, taskData);
  }

  markComplete(taskId: string): Observable<any> {
    return this._HttpClient.patch(`${baseUrl}/api/v1/tasks/${taskId}/complete`, taskId);
  }

  deleteTask(taskId: string): Observable<any> {
    return this._HttpClient.delete(`${baseUrl}/api/v1/tasks/${taskId}`);
  }

}
