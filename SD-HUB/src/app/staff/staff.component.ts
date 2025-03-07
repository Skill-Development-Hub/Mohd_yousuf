import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import * as userService from '../services/user.service';


@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrl: './staff.component.css'
})
export class StaffComponent {
  isCheckedIn = false;
  isCheckedOut = false;
  attendanceMessage = '';
  isError = false;

  checkIn() {
    this.isCheckedIn = true;
    this.attendanceMessage = 'Checked in successfully!';
    this.isError = false;
  }

  checkOut() {
    if (!this.isCheckedIn) {
      this.isError = true;
      this.attendanceMessage = 'You must check in first!';
      return;
    }
    this.isCheckedOut = true;
    this.attendanceMessage = 'Checked out successfully!';
    this.isError = false;
  }
}