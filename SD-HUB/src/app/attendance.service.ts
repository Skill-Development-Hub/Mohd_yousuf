import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Attendance {
  id: number;
  userId: number;
  userName: string;
  userRole?: string;  // Ensure this exists if needed in the template
  date: string;
  checkInTime: string;
  checkOutTime: string | null;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/api/attendance';

  constructor(private http: HttpClient) {}

  getAttendanceRecords(): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(this.apiUrl);
  }

  getUserAttendance(userId: number): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/user/${userId}`);
  }

  checkIn(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-in`, { userId });
  }

  checkOut(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/check-out`, { userId });
  }

  getAttendanceByDate(date: string): Observable<Attendance[]> {
    return this.http.get<Attendance[]>(`${this.apiUrl}/date/${date}`);
  }

  getAttendanceReport(startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/report?startDate=${startDate}&endDate=${endDate}`);
  }
}
