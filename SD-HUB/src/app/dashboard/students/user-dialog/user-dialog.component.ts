import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {
  userForm: FormGroup;
  dialogTitle: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dialogTitle = data.mode === 'add' ? 'Add New User' : 'Edit User';
    
    this.userForm = this.fb.group({
      id: [data.mode === 'edit' ? data.user.id : null],
      name: [data.mode === 'edit' ? data.user.name : '', [Validators.required]],
      course: [data.mode === 'edit' ? data.user.course : '', [Validators.required]],
      contactNumber: [data.mode === 'edit' ? data.user.contactNumber : '', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: [data.mode === 'edit' ? data.user.email : '', [Validators.required, Validators.email]],
      status: [data.mode === 'edit' ? data.user.status : 'active', [Validators.required]]
    });

    // Add password fields only for new users
    if (data.mode === 'add') {
      this.userForm.addControl('password', this.fb.control('', [Validators.required, Validators.minLength(6)]));
      this.userForm.addControl('confirmPassword', this.fb.control('', [Validators.required]));
    }
  }

  onSubmit() {
    if (this.userForm.valid) {
      // Check if passwords match for new users
      if (this.data.mode === 'add' && 
          this.userForm.get('password')?.value !== this.userForm.get('confirmPassword')?.value) {
        alert('Passwords do not match');
        return;
      }
      this.dialogRef.close(this.userForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
