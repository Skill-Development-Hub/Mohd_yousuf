import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent {
  courses = [
    {
      title: 'Web Development',
      instructor: 'Mohammed Tajjamul Ali',
      category: 'Programming',
      description: 'Learn front-end, back-end, database, and deployment.',
      features: ['React.js','Express.js','MySQL / MongoDB','Node.js','Real-Time Projects','Basic Linux Commands','Testing, Trouboleshooting & Deployment','Learn Interview skills, Telugu & English language'],
      duration: '3 months',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      status: 'ongoing'
    },
    {
      title: 'Accounting + Tally ERP',
      instructor: 'Syed Shaida Hussain',
      category: '-------',
      description: 'Complete accounting with Tally ERP software.',
       features: ['Introduction on how Digital Marketing works','SEO & Google Ranking Strategies','Social Media Marketing','Google Ads & PPC Campaigns','Email & Content Marketing','Analytics & Performance Tracking','Hands-on Training with Live Projects','Learn Interview Skills, English & Telugu Language'
      ],
      duration: '3 months',
      startDate: '2024-03-01',
      endDate: '2024-06-01',
      status: 'ongoing'
    }
  ];

  isDialogOpen = false;
  isEditing = false;
  newCourse: any = {};
  featuresInput: string = '';

  openAddCourseDialog() {
    this.newCourse = {};
    this.featuresInput = '';
    this.isEditing = false;
    this.isDialogOpen = true;
  }

  editCourse(index: number) {
    this.newCourse = { ...this.courses[index] };
    this.featuresInput = this.newCourse.features ? this.newCourse.features.join(', ') : '';
    this.isEditing = true;
    this.isDialogOpen = true;
  }

  deleteCourse(index: number) {
    this.courses.splice(index, 1);
  }

  saveCourse() {
    this.newCourse.features = this.featuresInput ? this.featuresInput.split(',').map(f => f.trim()) : [];

    if (this.isEditing) {
      const index = this.courses.findIndex(course => course.title === this.newCourse.title);
      if (index !== -1) {
        this.courses[index] = { ...this.newCourse };
      }
    } else {
      this.courses.push({ ...this.newCourse });
    }

    this.closeDialog();
  }

  closeDialog() {
    this.isDialogOpen = false;
  }

  updateFeatures() {
    this.newCourse.features = this.featuresInput ? this.featuresInput.split(',').map(f => f.trim()) : [];
  }
}
