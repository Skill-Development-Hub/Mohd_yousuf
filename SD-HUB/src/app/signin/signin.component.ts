import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
  hidePassword = true;
  logoPath = 'assets/images/sd-hub-logo.jpg';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      // Implement your signin logic here
      console.log('Signin form submitted', this.signinForm.value);
      this.snackBar.open('Sign in successful!', 'Close', { duration: 3000 });
      // Navigate to dashboard or home page after successful signin
      // this.router.navigate(['/dashboard']);
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  forgotPassword(): void {
    // Implement forgot password logic here
    console.log('Forgot password clicked');
    this.snackBar.open('Password reset link sent to your email.', 'Close', { duration: 3000 });
  }

  redirectToRegistration(): void {
    this.router.navigate(['/registration']);
  }
}