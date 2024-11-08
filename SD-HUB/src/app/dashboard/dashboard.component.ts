import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  navItems = [
    { icon: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { icon: 'school', label: 'Deans', link: '/deans' },
    { icon: 'person', label: 'Trainers', link: '/teachers' },
    { icon: 'groups', label: 'Students', link: '/students' },
    { icon: 'book', label: 'Courses', link: '/subjects' },
    { icon: 'newspaper', label: 'News', link: '/news' },
    { icon: 'account_circle', label: 'Profile', link: '/profile' }
  ];

 
  constructor(private router: Router) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    
    this.router.navigate(['/signin']);
  }
}