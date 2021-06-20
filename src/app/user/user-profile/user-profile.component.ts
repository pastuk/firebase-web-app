import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import firebase from 'firebase';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [ './user-profile.component.scss' ]
})
export class UserProfileComponent implements OnInit {
  firebaseUser: firebase.User | null = null;
  userProfileForm: FormGroup;

  constructor(
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private userService: UserService) {
    this.userProfileForm = this.formBuilder.group({
      displayName: [],
      email: [ null, [ Validators.required, Validators.email ] ],
      emailVerified: [],
      phoneNumber: [],
      uid: []
    });
  }

  get displayName(): string {
    return this.userProfileForm.get('displayName')?.value;
  }

  get email(): string {
    return this.userProfileForm.get('email')?.value;
  }

  get phoneNumber(): string {
    return this.userProfileForm.get('phoneNumber')?.value;
  }

  get uid(): string {
    return this.userProfileForm.get('uid')?.value;
  }

  ngOnInit(): void {
    this.auth.authState.subscribe((value) => {
      this.userProfileForm.patchValue(value ?? {});
      this.firebaseUser = value;
    });
  }

  updateProfile(): void {
    if (this.userProfileForm.valid) {
      this.firebaseUser?.updateProfile({ displayName: this.displayName })
        .catch(error => {
          console.log(error);
        });
    }
  }

}
