import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-trainer-dialog',
  templateUrl: './trainer-dialog.component.html',
  styleUrl: './trainer-dialog.component.css'
})
export class TrainerDialogComponent {
  trainerForm: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TrainerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data.mode === 'add' ? 'Add New Trainer' : 'Edit Trainer';
    
    this.trainerForm = this.fb.group({
      id: [data.mode === 'edit' ? data.trainer.id : null],
      name: [data.mode === 'edit' ? data.trainer.name : '', [Validators.required]],
      course: [data.mode === 'edit' ? data.trainer.course : '', [Validators.required]],
      contactNumber: [data.mode === 'edit' ? data.trainer.contactNumber : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [data.mode === 'edit' ? data.trainer.email : '', [Validators.required, Validators.email]],
      currentBatch: [data.mode === 'edit' ? data.trainer.currentBatch : '', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.trainerForm.valid) {
      this.dialogRef.close(this.trainerForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
