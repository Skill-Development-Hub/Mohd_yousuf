import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {
  private apiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  addstudents(students: any): Observable<any> {
    return this.http.post(this.apiUrl, students);
  }
}
