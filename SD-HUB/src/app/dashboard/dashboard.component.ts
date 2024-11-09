import { Component } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  studentSummary = {
    totalStudents: 700,
    activeStudents: 500,
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

}