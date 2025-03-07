import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Attendance, AttendanceService } from '../../attendance.service';
import { AuService } from '../../services/au.service';


@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.css'
})
export class AttendanceComponent implements OnInit {
  attendanceRecords: any[] = [];
  startDate: string;
  endDate: string;
  isAdmin = false;
  currentUserId = 0;

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuService
  ) {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];
    
    // Set start date to 30 days ago
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.startDate = thirtyDaysAgo.toISOString().split('T')[0];
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = currentUser.id;
    }

    this.loadAttendanceData();
  }

  loadAttendanceData() {
    if (this.isAdmin) {
      this.attendanceService.getAttendanceReport(this.startDate, this.endDate).subscribe(data => {
        this.attendanceRecords = data;
      });
    } else {
      this.attendanceService.getUserAttendance(this.currentUserId).subscribe(data => {
        this.attendanceRecords = data.filter(record => {
          const recordDate = new Date(record.date);
          return recordDate >= new Date(this.startDate) && recordDate <= new Date(this.endDate);
        });
      });
    }
  }

  calculateHoursWorked(record: Attendance): string {
    if (!record.checkInTime || !record.checkOutTime) {
      return '-';
    }

    const checkIn = new Date(`${record.date}T${record.checkInTime}`);
    const checkOut = new Date(`${record.date}T${record.checkOutTime}`);
    
    const diffMs = checkOut.getTime() - checkIn.getTime();
    const diffHrs = diffMs / (1000 * 60 * 60);
    
    return diffHrs.toFixed(2);
  }

  exportReport() {
    this.attendanceService.getAttendanceReport(this.startDate, this.endDate).subscribe(data => {
      this.downloadCSV(data, `attendance_report_${this.startDate}_to_${this.endDate}.csv`);
    });
  }

  downloadCSV(data: any[], filename: string) {
    if (data.length === 0) {
      alert('No data to export');
      return;
    }

    const headers = Object.keys(data[0]);
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data rows
    for (const row of data) {
      const values = headers.map(header => {
        const value = row[header] || '';
        return `"${value}"`;
      });
      csvRows.push(values.join(','));
    }
    
    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', filename);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
}