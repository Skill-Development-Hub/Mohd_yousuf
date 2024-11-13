import { Component, OnInit } from '@angular/core';
import { StudentsService } from '../students.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userlist = 0;
  user = [];

  constructor(
    private StudentsService: StudentsService,
  ) {}
  studentSummary = {
    activestd: 0,
    completedStudents: 0
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
    this.getStatus();
    this.StudentsService.getUsers().subscribe(users => {
      console.log(users);
      this.user = users;
      console.log(this.user)
      this.userlist = users.length;
    });
  }

  getStatus = () => {
    this.StudentsService.getStudentsStatus().subscribe(std_status => {
      console.log(std_status);
      var active = std_status.filter((each: any) => { return each._id == 'active' });
      this.studentSummary.activestd = active[0].count;
      
      var completed = std_status.filter((each: any) => { return each._id == 'completed' });
      this.studentSummary.completedStudents = completed[0].count;
    });
  }
}