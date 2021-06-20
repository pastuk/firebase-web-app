import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SharedService } from '@shared/shared.service';
import { AppItem } from '../../app-item.enum';
import { UserPath } from '../../user/user-path.enum';
import { AuthError } from '../auth-error.enum';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: [ './user-login.component.scss' ]
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private router: Router,
    private auth: AngularFireAuth,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private sharedService: SharedService
  ) {
    this.loginForm = this.formBuilder.group({
      email: [ null, [ Validators.required, Validators.email ] ],
      pwd: [ null, Validators.required ]
    });
  }

  get email(): string {
    return this.loginForm.get('email')?.value;
  }

  get pwd(): string {
    return this.loginForm.get('pwd')?.value;
  }

  get isEmailRequired(): boolean {
    return this.loginForm.get('email')?.hasError('required') ?? false;
  }

  get isEmailInvalid(): boolean {
    return this.loginForm.get('email')?.hasError('email') ?? false;
  }

  get isPasswordRequired(): boolean {
    return this.loginForm.get('pwd')?.hasError('required') ?? false;
  }

  get isLoginDisabled(): boolean {
    return this.loginForm.invalid || this.sharedService.isError;
  }

  ngOnInit(): void {
    this.sharedService.isError = false;
    const idToken = localStorage.getItem(AppItem.IdToken);
    if (idToken) {
      this.navigateToDashboard();
    }
  }

  async authenticate(): Promise<void> {
    if (this.loginForm.valid) {
      try {
        const { user } = await this.auth.signInWithEmailAndPassword(this.email, this.pwd);
        const idToken = await user?.getIdToken(true) ?? '';
        const lastSignInTime = user?.metadata?.lastSignInTime ?? '';
        localStorage.setItem(AppItem.LastSignInTime, lastSignInTime);
        localStorage.setItem(AppItem.IdToken, idToken);
        console.log(user?.toJSON());
        this.navigateToDashboard();
      } catch (e) {
        this.sharedService.displayErrorMessage(AuthError.InvalidCredentials);
      }
    }
  }

  private navigateToDashboard(): void {
    this.router.navigate([ UserPath.UserDashboard ])
      .catch(() => window.alert(AuthError.AuthGeneralError));
  }

}
