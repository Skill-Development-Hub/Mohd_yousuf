import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attendance, AttendanceService } from '../attendance.service';
import { AuService } from '../services/au.service';
import { User, UserService } from '../services/user.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.css']
})
export class HelloComponent implements OnInit {
  attendanceRecords: Attendance[] = [];
  startDate: string;
  endDate: string;
  isAdmin = false;
  currentUserId = 0;

  users: User[] = [];
  userForm: FormGroup;
  showForm = false;
  editingUser: User | null = null;

  totalStaff = 0;
  totalTrainers = 0;
  presentToday = 0;
  absentToday = 0;

  todayAttendance = [
    { userName: 'sohail', userRole: 'Trainer', checkInTime: '9:00 AM', checkOutTime: '5:00 PM', status: 'present' },
    { userName: 'fahad', userRole: 'Staff', checkInTime: '9:15 AM', checkOutTime: null, status: 'present' }
  ];

  constructor(
    private attendanceService: AttendanceService,
    private authService: AuService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    const today = new Date();
    this.endDate = today.toISOString().split('T')[0];

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);
    this.startDate = thirtyDaysAgo.toISOString().split('T')[0];

    this.userForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['staff', Validators.required],
      department: [''],
      position: [''],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.currentUserId = currentUser.id;
    }

    this.loadAttendanceData();
    this.loadUsers();
    this.loadDashboardStats();
  }

  loadDashboardStats(): void {
    this.userService.getDashboardStats().subscribe({
      next: (data) => {
        if (data && typeof data === 'object') {  // ✅ Ensure data is valid JSON
          this.totalStaff = data.totalStaff || 0;
          this.totalTrainers = data.totalTrainers || 0;
          this.presentToday = data.presentToday || 0;
          this.absentToday = data.absentToday || 0;
        } else {
          console.error('Invalid dashboard stats format:', data);
        }
      },
      error: (error) => {
        console.error("Error fetching dashboard stats:", error);
      }
    });
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

    csvRows.push(headers.join(','));

    for (const row of data) {
      const values = headers.map(header => {
        const value = (row as any)[header] || '';
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

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  showAddUserForm() {
    this.editingUser = null;
    this.userForm.reset({
      role: 'staff'
    });
    this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(6)]);
    this.userForm.get('password')?.updateValueAndValidity();
    this.showForm = true;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm.patchValue({
      name: user.name,
      email: user.email,
      role: user.role,
      department: user.department,
      position: user.position
    });
    this.userForm.get('password')?.clearValidators();
    this.userForm.get('password')?.updateValueAndValidity();
    this.showForm = true;
  }

  cancelForm() {
    this.showForm = false;
    this.editingUser = null;
  }

  onSubmit() {
    if (this.userForm.invalid) {
      return;
    }

    const userData = this.userForm.value;

    if (this.editingUser) {
      this.userService.updateUser(this.editingUser.id, userData).subscribe({
        next: () => {
          this.loadUsers();
          this.showForm = false;
          this.editingUser = null;
        },
        error: (err) => {
          console.error('Error updating user:', err);
          alert('Failed to update user. Please try again.');
        }
      });
    } else {
      this.userService.createUser(userData).subscribe({
        next: () => {
          this.loadUsers();
          this.showForm = false;
        },
        error: (err) => {
          console.error('Error creating user:', err);
          alert('Failed to create user. Please try again.');
        }
      });
    }
  }

  toggleUserStatus(user: User) {
    const updatedStatus = { isActive: !user.isActive };
    this.userService.updateUser(user.id, updatedStatus).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error('Error updating user status:', err);
        alert('Failed to update user status. Please try again.');
      }
    });
  }
}
