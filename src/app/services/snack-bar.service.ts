import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(protected snackBar: MatSnackBar) { }

  public printOk(message: string): void
  {
    this.open(message, 'OK', 5000, 'success-dialog');
  }

  public printError(message: string): void
  {
    this.open(message, 'OK', 5000, 'error-dialog');
  }

  public open(message: string, buttonMessage: string, duration: number, panelClass: string | string[]): void
  {
    this.snackBar.open(message, buttonMessage, {
      duration: duration,
      panelClass: panelClass
    })
  }
}
