import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { TrainersComponent } from './dashboard/trainers/trainers.component';
import { DeansComponent } from './dashboard/deans/deans.component';
import { CoursesComponent } from './dashboard/courses/courses.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/navbar', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'navbar', component: NavbarComponent},
  { path: 'signup', component: SignupComponent },
  // {path: 'dashboard', component:DashboardComponent},
  // { path: 'profile', component: ProfileComponent },
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'trainers', component: TrainersComponent },
      { path: 'deans', component: DeansComponent },
      { path: 'courses', component: CoursesComponent },

      // Add other routes here
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
