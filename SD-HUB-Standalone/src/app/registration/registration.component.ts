import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  logoPath = 'assets/images/sd-hub-logo.jpg';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.firstFormGroup = this.formBuilder.group({
      studentId: ['', Validators.required],
      applicationDate: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      fatherFirstName: ['', Validators.required],
      fatherMiddleName: [''],
      fatherLastName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      guardianContact: ['', Validators.required],
      householdIncome: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      courseApplied: ['', Validators.required],
      degree: ['', Validators.required],
      collegeName: ['', Validators.required],
      yearOfPassing: ['', Validators.required],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value
      };
      console.log('Registration form submitted', formData);
      this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/login']);
    } else {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
    }
  }

  reset(): void {
    this.firstFormGroup.reset();
    this.secondFormGroup.reset();
  }
}