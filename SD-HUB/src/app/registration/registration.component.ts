import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
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