import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  generateUniqueId(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/generate-unique-id`);
  }

  addstudents(students: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/addstudents`, students);
  }

  updateStudent(student: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/students/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/students/${id}`);
  }

  signup(user: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/signup`, user);
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/users/${user.id}`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/users/${id}`);
  }

  // studentSignin(credentials: any): Observable<any>{
  //   return this.http.post<any>(`${this.apiUrl}/student-signin`, credentials);
  // }

  // adminSignin(credentials: any): Observable<any>{
  //   return this.http.post<any>(`${this.apiUrl}/admin-signin`, credentials);
  // }
  signin(credentials: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/signin`, credentials);
  }

  getsignupusers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/signupusers`);
  }

  getUsers(): Observable<any> {
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

   // New methods for trainer CRUD operations
   addTrainer(trainer: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/trainers`, trainer);
  }

  updateTrainer(trainer: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/trainers/${trainer.id}`, trainer);
  }

  deleteTrainer(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/trainers/${id}`);
  }
  
  getDeans(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/deans`);
  }

  getCourses(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/courses`);
  }
}
