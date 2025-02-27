import { Component } from '@angular/core';

@Component({
  selector: 'app-main-course',
  templateUrl: './main-course.component.html',
  styleUrls: ['./main-course.component.css']
})
export class MainCourseComponent {
  
  openModal(courseId: string) {
    const modal = document.getElementById(courseId);
    if (modal) {
      modal.style.display = "flex";
    }
  }

  closeModal(courseId: string) {
    const modal = document.getElementById(courseId);
    if (modal) {
      modal.style.display = "none";
    }
  }
}
