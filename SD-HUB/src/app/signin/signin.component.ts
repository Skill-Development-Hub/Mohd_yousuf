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
  hideConfirmPassword = true;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private StudentsService: StudentsService,
    private authService: AuthService,
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      const {email, password } = this.signinForm.value;
      console.log('Sign-in Data: ', {email, password});
      
    //   this.StudentsService.signin({email, password }).subscribe(user => {
    //     console.log(user);
    //     this.snackBar.open('Sign in successful!', 'Close', { duration: 3000 });
    //   this.router.navigate(['/dashboard']); 
    // });
      this.login({email, password });
      this.StudentsService.login({email, password }).subscribe({
        next: (v) => {
          console.log(`observerA: ${v}`);
          this.router.navigate(['/dashboard']);
        },
        error: (e) =>{
          console.log(e);
          this.snackBar.open(e.error.message, 'Close', { duration: 3000 });
        },
        complete: () => console.info('Complete')
      });
    }
  }

  login(creds: any): void {
    // Here you should authenticate the user with your API and retrieve a token
    const token = 'dummy-jwt-token';  // Replace with actual token from API
    // Call AuthService to save the token and expiry time
    this.authService.login(token, creds);
    // After successful login, redirect to the previously requested route or dashboard
    this.router.navigate(['/dashboard']);
  }

  forgotPassword(): void {
    console.log('Forgot password clicked');
    this.snackBar.open('Password reset link sent to your email.', 'Close', { duration: 3000 });
  }

  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }
}