// contact.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'http://localhost:3000/contact'; // Direct URL to your Express endpoint

  constructor(private http: HttpClient) { }

  submitContactForm(formData: any) {
    return this.http.post(this.apiUrl, formData);
  }
}