import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AptitudeService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  getQuestions(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/aptitude`);
  }  

}
