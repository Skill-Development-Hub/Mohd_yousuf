import { Component } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  adminProfile = {
    name: 'Admin',
    role: 'Admin',
    email: 'admin@sdhub.com',
    loginId: 'ADM202305001',
    registered: '2023',
    dateOfBirth: '1990-01-01',
    phoneNumber: '123456789'
  };

}
