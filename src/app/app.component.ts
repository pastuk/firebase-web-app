import { Component } from '@angular/core';

import { AppUpdateService } from './app-update.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'intermed-web-app';

  constructor(
    private authService: AuthService,
    private appUpdateService: AppUpdateService) {
    this.appUpdateService.checkForUpdatePeriodically();
    this.authService.checkCredentials();
  }
}
