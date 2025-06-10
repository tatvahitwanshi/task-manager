import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl: string = 'http://localhost:5223/api';

  constructor(private http: HttpClient) { }
  getTasks(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:5223/api/task/by-user', { withCredentials: true });
  }

  createTask(task: any): Observable<any> {
    return this.http.post('http://localhost:5223/api/task/create', task, { withCredentials: true });
  }
  getTaskById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/task/${id}`);
  }

  updateTask(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/task/${id}`, data);
  }

  deleteTask(id: number) {
    return this.http.delete(`http://localhost:5223/api/Auth/${id}`, { withCredentials: true });
  }
}
