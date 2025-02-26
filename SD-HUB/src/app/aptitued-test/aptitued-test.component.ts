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
  answers: { [key: string]: string } = {};
  isLoading = true;
  
  constructor(
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
    private aptitudeService: AptitudeService
  ) {
    this.personalInfoForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      courseApplied: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.loadQuestions();
  }

  loadQuestions() {
    this.isLoading = true;
    this.aptitudeService.getQuestions().subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const data = response[0];
          this.aptitudeQuestions = data.aptitudeQuestions || [];
          this.generalKnowledgeQuestions = data.generalKnowledgeQuestions || [];
          this.criticalThinkingQuestions = data.criticalThinkingQuestions || [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading questions:', error);
        this.snackBar.open('Error loading questions. Please try again.', 'Close', {
          duration: 3000
        });
        this.isLoading = false;
      }
    });
  }

  onAnswerSelect(questionId: string, answer: string) {
    this.answers[questionId] = answer;
  }

  onSubmit() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.personalInfoForm.valid) {
          const testData = {
            personalInfo: this.personalInfoForm.value,
            answers: this.answers
          };
          
          this.aptitudeService.submitTest(testData).subscribe({
            next: () => {
              this.snackBar.open('Test submitted successfully!', 'Close', {
                duration: 3000
              });
              this.router.navigate(['/test-complete']);
            },
            error: (error) => {
              console.error('Error submitting test:', error);
              this.snackBar.open('Error submitting test. Please try again.', 'Close', {
                duration: 3000
              });
            }
          });
        }
      }
    });
  }
}