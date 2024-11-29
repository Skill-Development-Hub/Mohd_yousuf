import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { StudentsService } from '../students.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})

export class RegistrationComponent implements OnInit {
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  declarationForm: FormGroup;
  uniqueId: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private StudentsService: StudentsService
  ) {
    this.firstFormGroup = this.formBuilder.group({
      uniqueId: ['',],
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
      yearOfPassing: ['',Validators.required],
      percentage: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    this.declarationForm = this.formBuilder.group({
      declaration: [''],
      studentSignature: [''],
      parentSignature: [''],
    });
  }

  ngOnInit(): void {
    this.generateUniqueId();
  }

  generateUniqueId(): void {
    this.StudentsService.generateUniqueId().subscribe(
      (response: { uniqueId: string }) => {
        this.uniqueId = response.uniqueId;
        this.firstFormGroup.patchValue({ uniqueId: this.uniqueId });
      },
      (error) => {
        console.error('Error generating unique ID:', error);
        this.snackBar.open('Error generating unique ID', 'Close', { duration: 3000 });
      }
    );
  }

  onSubmit(): void {
    if (this.firstFormGroup.valid && this.secondFormGroup.valid && this.declarationForm.valid) {
      const formData = {
        ...this.firstFormGroup.value,
        ...this.secondFormGroup.value,
        ...this.declarationForm.value
      };
      this.StudentsService.addstudents(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
      this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
      this.router.navigate(['/signin']);
        }
        );
      }
     else {
      this.snackBar.open('Please fill all required fields', 'Close', { duration: 3000 });
    }
  }
}