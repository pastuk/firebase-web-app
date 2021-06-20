import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  isError: boolean; // used to clear or block logic

  constructor(private snackBar: MatSnackBar) {
    this.isError = false;
  }

  displayErrorMessage(message: string): void {
    this.isError = true;
    this.snackBar.open(message, 'OK', {
      duration: 4000,
      politeness: 'assertive',
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    }).afterDismissed()
      .subscribe(() => this.isError = false);
  }
}
