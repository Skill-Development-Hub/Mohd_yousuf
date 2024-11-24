import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  navItems = [
    { icon: 'dashboard', label: 'Dashboard', link: '/dashboard' },
    { icon: 'person', label: 'Trainers', link: '/trainers' },
    { icon: 'groups', label: 'Students', link: '/students' },
    { icon: 'book', label: 'Courses', link: '/courses' },
    { icon: 'library_books', label: 'Syllabus', link: '/syllabus' },
    { icon: 'newspaper', label: 'News', link: '/news' },
    { icon: 'account_circle', label: 'Profile', link: '/profile' },
  ];

  constructor(
    private router: Router,
    private AuthService: AuthService
  ) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.AuthService.logout();
    this.router.navigate(['/signin']);
  }
}
