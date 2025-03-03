import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { provideHttpClient  } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatChipsModule } from '@angular/material/chips';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTabsModule} from '@angular/material/tabs';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './dashboard/profile/profile.component';
import { AdminComponent } from './admin/admin.component';
import { StudentsComponent } from './dashboard/students/students.component';
import { TrainersComponent } from './dashboard/trainers/trainers.component';
import { DeansComponent } from './dashboard/deans/deans.component';
import { CoursesComponent } from './dashboard/courses/courses.component';
import { NewsComponent } from './dashboard/news/news.component';
import { HomeComponent } from './home/home.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AptituedTestComponent } from './aptitued-test/aptitued-test.component';
import { StdDashboardComponent } from './std-dashboard/std-dashboard.component';
import { SyllabusComponent } from './dashboard/syllabus/syllabus.component';
import { MainCourseComponent } from './main-course/main-course.component';
import { ChatWidgetComponent } from './chat-widget/chat-widget.component';
import { BannerComponent } from './banner/banner.component';
import { ConfirmationDialogComponent } from './aptitued-test/confirmation-dialog.component';
import { ContactComponent } from './contact/contact.component';
import { FooterComponent } from './footer/footer.component';
import { TestResultComponent } from './test-result/test-result.component';
import { StaffComponent } from './staff/staff.component';
import { GalleryComponent } from './gallery/gallery.component';
import { TrainerDialogComponent } from './dashboard/trainers/trainer-dialog/trainer-dialog.component';
import { UserDialogComponent } from './dashboard/students/user-dialog/user-dialog.component';
import { StudentDialogComponent } from './dashboard/students/student-dialog/student-dialog.component';
import { StakeholderDashComponent } from './stakeholder-dash/stakeholder-dash.component';
import { TrainerComponent } from './trainer/trainer.component';
import { MoreGalleryComponent } from './more-gallery/more-gallery.component';


@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    RegistrationComponent,
    NavbarComponent,
    SignupComponent,
    DashboardComponent,
    ProfileComponent,
    AdminComponent,
    StudentsComponent,
    TrainersComponent,
    DeansComponent,
    CoursesComponent,
    NewsComponent,
    HomeComponent,
    AboutusComponent,
    AptituedTestComponent,
    StdDashboardComponent,
    SyllabusComponent,
    MainCourseComponent,
    ChatWidgetComponent,
    BannerComponent,
    ConfirmationDialogComponent,
    ContactComponent,
    FooterComponent,
    TestResultComponent,
    StaffComponent,
    GalleryComponent,
    StakeholderDashComponent,
    TrainerComponent,
    StaffComponent,
    GalleryComponent,
    TrainerDialogComponent,
    UserDialogComponent,
    StudentDialogComponent,
    MoreGalleryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatSelectModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatTabsModule,
    MatRadioModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }