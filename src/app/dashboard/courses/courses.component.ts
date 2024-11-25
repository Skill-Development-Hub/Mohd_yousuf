import { Component } from '@angular/core';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  courses = [
    {
      title: 'Web Development',
      description: 'Full stack web development with modern technologies',
      duration: '3 months',
      status: 'active'
    },
    {
      title: 'Data Analytics',
      description: 'Comprehensive data analysis and visualization',
      duration: '3 months',
      status: 'active'
    },
    {
      title: 'Accounting + Tally ERP',
      description: 'Complete accounting with Tally ERP software',
      duration: '3 months',
      status: 'active'
    },
    {
      title: 'Digital Marketing + Graphic Designing',
      description: 'Digital marketing strategies and graphic design skills',
      duration: '3 months',
      status: 'active'
    },
    {
      title: 'Office Administration',
      description: 'Professional office management and administration',
      duration: '3 months',
      status: 'upcoming'
    }
  ];
}
