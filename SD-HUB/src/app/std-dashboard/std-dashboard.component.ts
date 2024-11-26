import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';


@Component({
  selector: 'app-std-dashboard',
  templateUrl: './std-dashboard.component.html',
  styleUrl: './std-dashboard.component.css'
})
export class StdDashboardComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  navItems = [
    { icon: 'quiz', label: 'Entrance Test', link: '/aptitude' },
    { icon: 'how_to_reg', label: 'Application Form', link: '/registration' }
  ];

  constructor(
    private router: Router,
  ) {}

  toggleSidenav() {
    this.sidenav.toggle();
  }

  logout() {
    this.router.navigate(['/signin']);
  }
}
