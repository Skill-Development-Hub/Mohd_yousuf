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
  hideConfirmPassword = true;


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signinForm.valid) {
      console.log('Signin form submitted', this.signinForm.value);
      this.snackBar.open('Sign in successful!', 'Close', { duration: 3000 });
      // this.router.navigate(['/dashboard']);
    }
  }

  forgotPassword(): void {
    console.log('Forgot password clicked');
    this.snackBar.open('Password reset link sent to your email.', 'Close', { duration: 3000 });
  }

  redirectToSignup(): void {
    this.router.navigate(['/signup']);
  }
}