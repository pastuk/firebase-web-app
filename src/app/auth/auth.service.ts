import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AppItem } from '../app-item.enum';
import { UserAccess } from '../user/user-access.enum';
import { UserPermission } from '../user/user-permission';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  permissions: UserPermission;
  redirectUrl: string;

  constructor(private auth: AngularFireAuth) {
    this.redirectUrl = '';
    this.permissions = {};
  }

  checkCredentials(): void {
    this.auth.idToken.subscribe((idToken) => {
      localStorage.setItem(AppItem.IdToken, idToken ?? '');
    });
  }

  checkPermissions(): void {
    const idToken = localStorage.getItem(AppItem.IdToken) ?? '';
    if (idToken) {
      this.permissions = {
        'Administrator': UserAccess.ReadWrite // TODO: replace with API response
      };
    }
  }
}
