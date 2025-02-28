import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsService } from '../../students.service';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import { StudentDialogComponent } from './student-dialog/student-dialog.component';

export interface UserData {
  id?: number;
  course: string;
  name: string;
  contactNumber: string;
  password?: string;
  confirmPassword?: string;
  email: string;
  status: string;
}

export interface StudentData {
  id?: number;
  uniqueId: string;
  firstName: string;
  lastName: string;
  applicationDate: string;
  course: string;
  email: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit, AfterViewInit {
  displayedUserColumns: string[] = ['course', 'name', 'contactNumber', 'email', 'status'];
  displayedStudentColumns: string[] = ['uniqueId', 'firstName', 'lastName', 'applicationDate', 'course', 'email'];
  
  userDataSource: MatTableDataSource<UserData>;
  studentDataSource: MatTableDataSource<StudentData>;

  @ViewChild('userPaginator') userPaginator!: MatPaginator;
  @ViewChild('studentPaginator') studentPaginator!: MatPaginator;
  @ViewChild('userSort') userSort!: MatSort;
  @ViewChild('studentSort') studentSort!: MatSort;

  constructor(
    private studentsService: StudentsService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.userDataSource = new MatTableDataSource<UserData>();
    this.studentDataSource = new MatTableDataSource<StudentData>();
  }

  ngOnInit() {
    this.getUsers();
    this.getStudents();
  }

  ngAfterViewInit() {
    this.userDataSource.paginator = this.userPaginator;
    this.userDataSource.sort = this.userSort;
    this.studentDataSource.paginator = this.studentPaginator;
    this.studentDataSource.sort = this.studentSort;
  }

  getUsers() {
    this.studentsService.getsignupusers().subscribe(users => {
      console.log('Users:', users);
      this.userDataSource.data = users;
    });
  }

  getStudents() {
    this.studentsService.getUsers().subscribe(students => {
      console.log('Students:', students);
      this.studentDataSource.data = students;
    });
  }

  openAddUserDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.signup(result).subscribe({
          next: (response) => {
            this.snackBar.open('User added successfully!', 'Close', { duration: 3000 });
            this.getUsers(); // Refresh the list
          },
          error: (error) => {
            console.error('Error adding user:', error);
            this.snackBar.open('Failed to add user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditUserDialog(user: UserData) {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: { mode: 'edit', user: user }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.updateUser(result).subscribe({
          next: (response) => {
            this.snackBar.open('User updated successfully!', 'Close', { duration: 3000 });
            this.getUsers(); // Refresh the list
          },
          error: (error) => {
            console.error('Error updating user:', error);
            this.snackBar.open('Failed to update user', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteUser(user: UserData) {
    if (confirm(`Are you sure you want to delete ${user.name}?`)) {
      this.studentsService.deleteUser(user.id!).subscribe({
        next: (response) => {
          this.snackBar.open('User deleted successfully!', 'Close', { duration: 3000 });
          this.getUsers(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting user:', error);
          this.snackBar.open('Failed to delete user', 'Close', { duration: 3000 });
        }
      });
    }
  }

  openAddStudentDialog() {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '500px',
      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.addstudents(result).subscribe({
          next: (response) => {
            this.snackBar.open('Student added successfully!', 'Close', { duration: 3000 });
            this.getStudents(); // Refresh the list
          },
          error: (error) => {
            console.error('Error adding student:', error);
            this.snackBar.open('Failed to add student', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  openEditStudentDialog(student: StudentData) {
    const dialogRef = this.dialog.open(StudentDialogComponent, {
      width: '500px',
      data: { mode: 'edit', student: student }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.studentsService.updateStudent(result).subscribe({
          next: (response) => {
            this.snackBar.open('Student updated successfully!', 'Close', { duration: 3000 });
            this.getStudents(); // Refresh the list
          },
          error: (error) => {
            console.error('Error updating student:', error);
            this.snackBar.open('Failed to update student', 'Close', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteStudent(student: StudentData) {
    if (confirm(`Are you sure you want to delete ${student.firstName} ${student.lastName}?`)) {
      this.studentsService.deleteStudent(student.id!).subscribe({
        next: (response) => {
          this.snackBar.open('Student deleted successfully!', 'Close', { duration: 3000 });
          this.getStudents(); // Refresh the list
        },
        error: (error) => {
          console.error('Error deleting student:', error);
          this.snackBar.open('Failed to delete student', 'Close', { duration: 3000 });
        }
      });
    }
  }

  applyUserFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userDataSource.filter = filterValue.trim().toLowerCase();

    if (this.userDataSource.paginator) {
      this.userDataSource.paginator.firstPage();
    }
  }

  applyStudentFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.studentDataSource.filter = filterValue.trim().toLowerCase();

    if (this.studentDataSource.paginator) {
      this.studentDataSource.paginator.firstPage();
    }
  }
}