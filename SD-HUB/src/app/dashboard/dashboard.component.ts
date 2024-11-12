import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userlist = 0;
  constructor(
    private StudentsService: StudentsService,
  ) {}
  studentSummary = {
    activestd: 20,
    completedStudents: 200
  };

  teachingStaffSummary = {
    totalStaff: 11,
    activeStaff: 9,
    completedStaff: 1
  };

  nonTeachingStaffSummary = {
    totalStaff: 4,
    activeStaff: 2,
    completedStaff: 1
  };

  instituteSummary = {
    totalCourses: 6,
    ongoingCourses: 6,
    completedCourses: 3
  };

  ngOnInit(): void {
    this.StudentsService.getUsers().subscribe(users => {
      console.log(users);
      this.userlist = users.length;
    });
}
}