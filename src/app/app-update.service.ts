import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { environment } from '@environments/environment';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {
  interval = interval(8 * 60 * 60 * 1000);

  constructor(
    private swUpdate: SwUpdate,
    private appRef: ApplicationRef) {
  }

  checkForUpdatePeriodically(): void {
    if (environment.production) {
      const appIsStable = this.appRef.isStable.pipe(first(isStable => isStable));  // Allow the app to stabilize first
      const onceAppIsStable = concat(appIsStable, this.interval);
      onceAppIsStable.subscribe(() => this.swUpdate.checkForUpdate());
    }
  }
}
