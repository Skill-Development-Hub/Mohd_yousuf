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

  studentSignin(credentials: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/student-signin`, credentials);
  }

  adminSignin(credentials: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/admin-signin`, credentials);
  }

  getUsers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/users`);
  }

  gettech(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/gettech`);
  }

  getStudentsStatus(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/studentsStatus`);
  }

  get_tStatus(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/tStatus`);
  }

  getStudents(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/students`);
  }

  getTrainers(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/trainers`);
  }

  getDeans(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/deans`);
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses`);
  }
}
