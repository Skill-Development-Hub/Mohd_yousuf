import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AptitudeService } from '../services/aptitude.service';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Component({
  selector: 'app-aptitued-test',
  templateUrl: './aptitued-test.component.html',
  styleUrls: ['./aptitued-test.component.css']
})
export class AptituedTestComponent implements OnInit {
  personalInfoForm: FormGroup;
  isLinear = true;
  aptitudeQuestions: any = [];
  generalKnowledgeQuestions: any = [];
  criticalThinkingQuestions: any = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private aptitudeService: AptitudeService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      email: ['', Validators.required],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      courseApplied: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.aptitudeService.getQuestions().subscribe({
      next: (value) => {
        this.aptitudeQuestions = value.filter((each: any) => each.aptitudeQuestions)[0]['aptitudeQuestions'];
        this.generalKnowledgeQuestions = value.filter((each: any) => each.generalKnowledgeQuestions)[0]['generalKnowledgeQuestions'];
        this.criticalThinkingQuestions = value.filter((each: any) => each.criticalThinkingQuestions)[0]['criticalThinkingQuestions'];
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log("Successfully fetched Questions");
      },
    });
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.personalInfoForm.valid) {
          const testData = {
            ...this.personalInfoForm.value,
          };
          // Submit test data to backend
          // this.aptitudeService.submitTest(testData).subscribe({
          //   next: (response) => {
          //     this.snackBar.open('Test submitted successfully!', 'Close', { duration: 3000 });
          //     this.router.navigate(['/test-complete']);
          //   },
          //   error: (error) => {
          //     this.snackBar.open('Error submitting test. Please try again.', 'Close', { duration: 3000 });
          //   }
          // });
        }
      }
    });
  }
}