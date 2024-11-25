import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  hidePassword = true;
  hideConfirmPassword = true;
  selected = 'Web Development';

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private StudentsService: StudentsService,
  ) {
    this.signupForm = this.fb.group({
      course: ['',Validators.required],
      name: ['',],
      contactNumber: ['',],
      email: ['', [Validators.required, Validators.email]],
      password: ['',],
      confirmPassword: ['',],
      status: ['pending',]
    });
  }

  ngOnInit(): void {
  }


  onSubmit() {
    if(this.signupForm.valid) {
      const {course, name, email, password, contactNumber, confirmPassword, status } = this.signupForm.value;

      console.log('Sign-Up Data: ', {course, name, email, password, contactNumber, confirmPassword, status });
      
      this.StudentsService.signup({course, name, email, password, contactNumber, confirmPassword, status }).subscribe(user => {
        console.log(user);
      this.snackBar.open('Signup successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/signin']);
    });
    } else {
      this.snackBar.open('Please fill all required fields correctly', 'Close', { duration: 3000 });
    }
  }
}