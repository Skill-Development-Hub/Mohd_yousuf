// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';
// import { StudentsService } from '../students.service';
// import { AuthService } from '../services/auth.service';

// @Component({
//   selector: 'app-signin',
//   templateUrl: './signin.component.html',
//   styleUrls: ['./signin.component.css']
// })
// export class SigninComponent implements OnInit {
//   signinForm: FormGroup;
//   hidePassword = true;
//   isAdmin = false;

//   constructor(
//     private formBuilder: FormBuilder,
//     private router: Router,
//     private snackBar: MatSnackBar,
//     private studentsService: StudentsService,
//     private authService: AuthService,
//   ) {
//     this.signinForm = this.formBuilder.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required]]
//     });
//   }

//   ngOnInit(): void {}

//   toggleUserType(): void {
//     this.isAdmin = !this.isAdmin;
//     this.signinForm.reset();
//   }

//   onSubmit(): void {
//     if (this.signinForm.valid) {
//       const credentials = this.signinForm.value;
      
//       if (this.isAdmin) {
//         this.studentsService.adminSignin(credentials).subscribe({
//           next: (response) => {
//             this.authService.signin(response.token, { ...credentials, role: 'admin' });
//             this.snackBar.open('Admin sign-in successful!', 'Close', { duration: 3000 });
//             this.router.navigate(['/dashboard']);
//           },
//           error: (error) => {
//             console.error('Admin sign-in error:', error);
//             this.snackBar.open(error.error.message || 'Sign-in failed', 'Close', { duration: 3000 });
//           }
//         });
//       } else {
//         this.studentsService.studentSignin(credentials).subscribe({
//           next: (response) => {
//             this.authService.signin(response.token, { ...credentials, role: 'student' });
//             this.snackBar.open(`${response.message}`, 'Close', { duration: 3000 });
//             this.router.navigate(['/aptitude']);
//           },
//           error: (error) => {
//             console.error('Student sign-in error:', error);
//             this.snackBar.open(error.error.message || 'Sign-in failed', 'Close', { duration: 3000 });
//           }
//         });
//       }
//     }
//   }

//   forgotPassword(): void {
//     this.snackBar.open('Password reset link sent to your email.', 'Close', { duration: 3000 });
//   }

//   redirectToSignup(): void {
//     this.router.navigate(['/signup']);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StudentsService } from '../students.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  hidePassword = true;

  roles = [
    { value: 'student', label: 'Student', route: '/aptitude' },
    { value: 'trainer', label: 'Trainer', route: '/trainer-dashboard' },
    { value: 'stakeholder', label: 'Stakeholder', route: '/stakeholder-dashboard' },
    { value: 'admin', label: 'Admin', route: '/dashboard' },
    { value: 'staff', label: 'Staff', route: '/staff-dashboard' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private studentsService: StudentsService,
    private authService: AuthService,
  ) {
    this.signinForm = this.formBuilder.group({
      role: ['student', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      const credentials = this.signinForm.value;
      
      this.studentsService.signin(credentials).subscribe({
        next: (response) => {
          this.authService.signin(response.token, credentials);
          this.snackBar.open(`${credentials.role.charAt(0).toUpperCase() + credentials.role.slice(1)} sign-in successful!`, 'Close', { duration: 3000 });
          
          const roleConfig = this.roles.find(r => r.value === credentials.role);
          if (roleConfig) {
            this.router.navigate([roleConfig.route]);
          }
        },
        error: (error) => {
          console.error('Sign-in error:', error);
          this.snackBar.open(error.error.message || 'Sign-in failed', 'Close', { duration: 3000 });
        }
      });
    }
  }

  forgotPassword(): void {
    this.snackBar.open('Password reset link sent to your email.', 'Close', { duration: 3000 });
  }

  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }

  isStudent(): boolean {
    return this.signinForm.get('role')?.value === 'student';
  }
}