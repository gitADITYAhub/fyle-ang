// src/app/user-profile/user-profile.component.ts

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
})
export class UserProfileComponent {
  @Input() user: any;
}
