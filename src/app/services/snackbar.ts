import { Component, Injectable, Input } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  // @Input() message!: string;

  constructor(private _snackbar: MatSnackBar) {}
  // openSnackBar(message: string) {
  //   this._snackbar.open(message);
  // }

  openSnackBar(
    message: string,
    action: string = 'Dismiss',
    config?: MatSnackBarConfig
  ) {
    this._snackbar.open(message, action, {
      ...config,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

  showSuccess(message: string, action: string = 'Dismiss') {
    this.openSnackBar(message, action, {
      panelClass: 'success-snackbar',
      duration: 3000,
    });
  }

  showError(message: string, action: string = 'Dismiss') {
    this.openSnackBar(message, action, {
      panelClass: ['error-snackbar'],
      duration: 100000,
    });
  }

  showInfo(message: string, action: string = '') {
    this.openSnackBar(message, action, {
      panelClass: ['info-snackbar'],
      duration: 4000,
    });
  }
}
