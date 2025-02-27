import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  saveAttendance(record: any) {
    return this.http.post(`${this.apiUrl}/attendance`, record);
  }

  getAttendance(userId: number, startDate: string, endDate: string) {
    return this.http.get<AttendanceRecord[]>(`${this.apiUrl}/attendance`, {
      params: {
        userId: userId.toString(),
        startDate,
        endDate
      }
    });
  }

  updateAttendance(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/attendance/${id}`, data);
  }
}

interface AttendanceRecord {
  id?: number;
  date: string;
  status: 'present' | 'absent' | null;
  reason: string | null;
}