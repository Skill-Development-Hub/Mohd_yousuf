import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addstudents(students: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addstudents`, students);
  }

  signup(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  // signin(user: any): Observable<any>{
  //   return this.http.post<any>(`${this.apiUrl}/signin`, user);
  // }

  login(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/login`, user);
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  getStudentsStatus(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/studentsStatus`);
  }
}
