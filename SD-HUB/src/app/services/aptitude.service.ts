import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AptitudeService {
  private apiUrl = 'http://localhost:3000';
  private testSubmittedSubject = new BehaviorSubject<boolean>(false);
  testSubmitted$ = this.testSubmittedSubject.asObservable();

  constructor(
    private http: HttpClient
  ) { }

  getQuestions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/aptitude`);
  }  

}
