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
import { SyllabusComponent } from './dashboard/syllabus/syllabus.component';
import { StaffComponent } from './staff/staff.component';

import { AuthGuard } from './auth.guard';
import { NewsComponent } from './dashboard/news/news.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AptituedTestComponent } from './aptitued-test/aptitued-test.component';
import { StdDashboardComponent } from './std-dashboard/std-dashboard.component';
import { MainCourseComponent } from './main-course/main-course.component';
import { ContactComponent } from './contact/contact.component';
import { TestResultComponent } from './test-result/test-result.component';
import { MoreGalleryComponent } from './more-gallery/more-gallery.component';
import { KanbanBoardComponent } from './staff/kanban-board/kanban-board.component';
import { AttendanceComponent } from './staff/attendance/attendance.component';
import { HelloComponent } from './hello/hello.component';
import { SyllabusTrackerComponent } from './syllabus-tracker/syllabus-tracker.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'staff', component: StaffComponent},
  { path: 'main-course', component: MainCourseComponent },
  // { path: 'aptitue', component: AptituedTestComponent },
  // { path: 'registration', component: RegistrationComponent },
  { path: 'navbar', component: NavbarComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'more-gallery', component: MoreGalleryComponent },
  { path: 'KanbanBoard', component: KanbanBoardComponent },
  { path: 'attw', component: AttendanceComponent },
  { path: 'hello', component: HelloComponent },
  { path: 'syllabus', component: SyllabusTrackerComponent },

  
  // {path: 'dashboard', component:DashboardComponent},
  // { path: 'profile', component: ProfileComponent },
  
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'students', component: StudentsComponent },
      { path: 'trainers', component: TrainersComponent },
      { path: 'deans', component: DeansComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'news', component: NewsComponent },
      { path: 'syllabus', component: SyllabusComponent },
      { path: 'test-result', component: TestResultComponent },
      

      // Add other routes here
    ]
  },
  {
    path: '',
    component: StdDashboardComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'aptitude', component: AptituedTestComponent },
      { path: 'registration', component: RegistrationComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    anchorScrolling: 'enabled', // Enables fragment scrolling
    scrollPositionRestoration: 'enabled', // Restores scroll position when navigating back
  }),
],
  exports: [RouterModule]
})
export class AppRoutingModule { }
