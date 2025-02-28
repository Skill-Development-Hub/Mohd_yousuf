import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { StudentsService } from '../../../students.service';

@Component({
  selector: 'app-student-dialog',
  templateUrl: './student-dialog.component.html',
  styleUrl: './student-dialog.component.css'
})
export class StudentDialogComponent {
  studentForm: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StudentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private studentsService: StudentsService
  ) {
    this.dialogTitle = data.mode === 'add' ? 'Add New Student' : 'Edit Student';
    
    this.studentForm = this.fb.group({
      id: [data.mode === 'edit' ? data.student.id : null],
      uniqueId: [data.mode === 'edit' ? data.student.uniqueId : '', [Validators.required]],
      firstName: [data.mode === 'edit' ? data.student.firstName : '', [Validators.required]],
      lastName: [data.mode === 'edit' ? data.student.lastName : '', [Validators.required]],
      applicationDate: [data.mode === 'edit' ? data.student.applicationDate : new Date().toISOString().split('T')[0], [Validators.required]],
      course: [data.mode === 'edit' ? data.student.course : '', [Validators.required]],
      email: [data.mode === 'edit' ? data.student.email : '', [Validators.required, Validators.email]]
    });

    // Generate unique ID for new students
    if (data.mode === 'add') {
      this.generateUniqueId();
    }
  }

  generateUniqueId() {
    this.studentsService.generateUniqueId().subscribe(response => {
      this.studentForm.patchValue({
        uniqueId: response.uniqueId
      });
    });
  }

  onSubmit() {
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
