import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">Confirm Submission</h2>
      <div mat-dialog-content class="dialog-content">
        Are you sure you want to submit the test? Once submitted, you cannot modify your answers.
      </div>
      <div mat-dialog-actions class="dialog-actions">
        <button mat-button (click)="onNoClick()">Cancel</button>
        <button mat-raised-button color="primary" [mat-dialog-close]="true">Submit</button>
      </div>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      min-width: 350px;
    }
    .dialog-title {
      margin: 0;
      color: #2e53aa;
      font-size: 20px;
    }
    .dialog-content {
      margin: 20px 0;
      color: #333;
      line-height: 1.5;
    }
    .dialog-actions {
      display: flex;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 24px;
    }
    button {
      min-width: 100px;
    }
  `]
})
export class ConfirmationDialogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false);
  }
}