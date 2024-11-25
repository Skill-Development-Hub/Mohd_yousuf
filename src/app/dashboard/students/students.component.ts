import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { StudentsService } from '../../students.service';

export interface UserData {
  course: string;
  name: string;
  contactNumber: number;
  password: string;
  confirmPassword: string;
  email: string;
  status: string;
}

export interface StudentData {
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

  constructor(private studentsService: StudentsService) {
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