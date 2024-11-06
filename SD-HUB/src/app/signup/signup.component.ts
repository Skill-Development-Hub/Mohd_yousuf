import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private StudentsService: StudentsService,
  ) {
    this.signupForm = this.fb.group({
      studentId: ['',],
      name: ['',],
      contactNumber: ['',],
      email: ['', [Validators.required, Validators.email]],
      password: ['',],
      confirmPassword: ['',],
    });
  }


  onSubmit() {
    if(this.signupForm.valid) {
      const {studentId, name, email, password, contactNumber, confirmPassword } = this.signupForm.value;
      console.log('Sign-Up Data: ', {studentId, name, email, password, contactNumber, confirmPassword });
      
      this.StudentsService.signup({studentId, name, email, password, contactNumber, confirmPassword }).subscribe(user => {
        console.log(user);
      this.snackBar.open('Signup successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/signin']);
    });
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    }
  }
}