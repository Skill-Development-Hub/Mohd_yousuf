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
  declarationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.firstFormGroup = this.formBuilder.group({
      studentId: [''],
      applicationDate: [''],
      firstName: [''],
      middleName: [''],
      lastName: [''],
      fatherFirstName: [''],
      fatherMiddleName: [''],
      fatherLastName: [''],
      dateOfBirth: [''],
      phoneNumber: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      guardianContact: [''],
      householdIncome: ['']
    });

    this.secondFormGroup = this.formBuilder.group({
      course: ['',Validators.required],
      degree: [''],
      collegeName: [''],
      yearOfPassing: [''],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.declarationForm = this.formBuilder.group({
      declaration: [false,Validators.required],
      studentSignature: [''],
      parentSignature: [''],
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.declarationForm.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.declarationForm.value
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