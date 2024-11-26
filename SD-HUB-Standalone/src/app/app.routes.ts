import { SigninComponent } from './signin/signin.component';
import { RegistrationComponent } from './registration/registration.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: '**', redirectTo: '/signin' }
];