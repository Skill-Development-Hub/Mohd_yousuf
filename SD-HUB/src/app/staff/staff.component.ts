import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../attendance.service';

interface AttendanceRecord {
  id?: number;
  date: string;
  status: 'present' | 'absent' | null;
  reason: string | null;
}


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent implements OnInit {
  selectedDate = new Date();
  attendanceRecords: { [key: string]: AttendanceRecord } = {};
  currentAttendance!: AttendanceRecord;
  absenceReasons = ['Health Issue', 'Personal Issue', 'Other Issues'];
  holidays: Date[] = [
    new Date('2024-01-01'),
    new Date('2024-01-26'),
  ];
  showSuccessMessage = false;
  userId = 1; // Replace with actual user ID from auth

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit() {
    this.loadSavedData();
  }

  private initializeDate(date: Date) {
    const dateString = this.getDateString(date);
    this.currentAttendance = this.attendanceRecords[dateString] || {
      date: dateString,
      status: null,
      reason: null
    };
  }

  onDateChange() {
    this.initializeDate(this.selectedDate);
    this.showSuccessMessage = false;
  }

  markPresent() {
    if (this.isWorkingDay(this.selectedDate)) {
      this.currentAttendance = {
        ...this.currentAttendance,
        status: 'present',
        reason: null
      };
      this.showSuccessMessage = false;
    }
  }

  markAbsent() {
    if (this.isWorkingDay(this.selectedDate)) {
      this.currentAttendance = {
        ...this.currentAttendance,
        status: 'absent',
        reason: this.currentAttendance.reason
      };
      this.showSuccessMessage = false;
    }
  }

  onSubmit() {
    if (this.currentAttendance.status) {
      this.saveAttendance();
    }
  }

  private saveAttendance() {
    const attendanceData = {
      date: this.currentAttendance.date,
      status: this.currentAttendance.status,
      reason: this.currentAttendance.reason,
      userId: this.userId
    };

    if (this.currentAttendance.id) {
      this.attendanceService.updateAttendance(this.currentAttendance.id, attendanceData)
        .subscribe({
          next: () => this.handleSaveSuccess(),
          error: (err) => console.error('Update failed:', err)
        });
    } else {
      this.attendanceService.saveAttendance(attendanceData)
        .subscribe({
          next: (response: any) => {
            this.currentAttendance.id = response.id;
            this.handleSaveSuccess();
          },
          error: (err) => console.error('Save failed:', err)
        });
    }
  }

  private handleSaveSuccess() {
    this.showSuccessMessage = true;
    setTimeout(() => this.showSuccessMessage = false, 3000);
    this.loadSavedData();
  }

  private loadSavedData() {
    const startDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth(), 1);
    const endDate = new Date(this.selectedDate.getFullYear(), this.selectedDate.getMonth() + 1, 0);

    this.attendanceService.getAttendance(
      this.userId,
      this.getDateString(startDate),
      this.getDateString(endDate)
    ).subscribe({
      next: (records: AttendanceRecord[]) => {
        this.attendanceRecords = {};
        records.forEach(record => {
          this.attendanceRecords[record.date] = record;
        });
        this.initializeDate(this.selectedDate);
      },
      error: (err) => console.error('Failed to load attendance:', err)
    });
  }

  private getDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  get isHoliday(): boolean {
    return this.holidays.some(h => 
      h.toDateString() === this.selectedDate.toDateString()
    );
  }

  isWorkingDay(date: Date): boolean {
    const day = date.getDay();
    return day !== 0 && day !== 6 && !this.isHoliday;
  }

  get totalPresent(): number {
    return Object.values(this.attendanceRecords).filter(r => r.status === 'present').length;
  }

  get totalAbsent(): number {
    return Object.values(this.attendanceRecords).filter(r => r.status === 'absent').length;
  }

  get totalWorkingDays(): number {
    return Object.keys(this.attendanceRecords).filter(dateString => {
      const date = new Date(dateString);
      return this.isWorkingDay(date);
    }).length;
  }
}