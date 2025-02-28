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
      description: 'Learn front-end, back-end, database, and deployment.',
      duration: '3 months',
      status: 'ongoing',
      features: [
        'React.js',
        'Express.js',
        'MySQL / MongoDB',
        'Node.js',
        'Real-Time Projects',
        'Basic Linux Commands',
        'Testing, Trouboleshooting & Deployment',
        'Learn Interview skills, Telugu & English language'
      ]
    },
    {
      title: 'Data Analytics',
      description: 'Comprehensive data analysis and visualization',
      duration: '3 months',
      status: 'ongoing',
      features: []
    },
    {
      title: 'Accounting + Tally ERP',
      description: 'Complete accounting with Tally ERP software',
      duration: '3 months',
      status: 'ongoing',
      features: [
        'Tally Prime Basics & Advanced Features',
        'GST, Taxation & E-Invoicing',
        'Financial Statements & Reports',
        'Inventory & Payroll Management',
        'Banking & Reconciliation',
        'Hands-on Practical Training',
        'Learn Interview Skills, English & Telugu Language'
      ]
    },
    {
      title: 'Digital Marketing + Graphic Designing',
      description: 'Digital marketing strategies and graphic design skills',
      duration: '3 months',
      status: 'ongoing',
      features: [
        'Introduction on how Digital Marketing works',
        'SEO & Google Ranking Strategies',
        'Social Media Marketing',
        'Google Ads & PPC Campaigns',
        'Email & Content Marketing',
        'Analytics & Performance Tracking',
        'Hands-on Training with Live Projects',
        'Learn Interview Skills, English & Telugu Language'
      ]
    },
    {
      title: 'Office Administration',
      description: 'Professional office management and administration',
      duration: '3 months',
      status: 'ongoing',
      features: []
    },
    {
      title: 'System Engineering',
      description: 'Master the art of designing and managing complex systems.',
      duration: '3 months',
      status: 'upcoming',
      features: [
        'SDLC Models',
        'System Modeling',
        'Requirements Engineering',
        'Verification & Validation',
        'Drives innovation and efficiency in product development',
        'Ensures quality, safety, and reliability across industries',
        'Connects ideas with execution through structured methodologies'
      ]
    },
  ];
}
