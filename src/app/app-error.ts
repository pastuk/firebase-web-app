import { ErrorHandler } from '@angular/core';

import { environment } from '@environments/environment';


export class AppError implements ErrorHandler {
  constructor() {
  }

  handleError(error: Error): void {
    if (!environment.production && error) {
      console.error(error);
    }
  }
}
