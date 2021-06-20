import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { AuthPath } from '../auth-path.enum';

@Component({
  selector: 'app-sign-out',
  templateUrl: './sign-out.component.html',
  styleUrls: [ './sign-out.component.scss' ]
})
export class SignOutComponent implements OnInit {
  backToLogin: string[];

  constructor(private auth: AngularFireAuth) {
    this.backToLogin = [ '/', AuthPath.UserLogin ];
  }

  ngOnInit(): void {
    this.auth.signOut()
      .finally(() => {
        localStorage.clear();
      });
  }

}
