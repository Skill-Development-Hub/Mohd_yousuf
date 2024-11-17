import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  navItems = [
    { icon: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { icon: 'school', label: 'Deans', link: '/deans' },
    { icon: 'person', label: 'Trainers', link: '/trainers' },
    { icon: 'groups', label: 'Students', link: '/students' },
    { icon: 'book', label: 'Courses', link: '/courses' },
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
