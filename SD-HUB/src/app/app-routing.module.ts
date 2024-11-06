import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'navbar', component: NavbarComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
