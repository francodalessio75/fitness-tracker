import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
 })
export class UIService{

  constructor( private snackbar: MatSnackBar ){}

  loadingStateChanged = new Subject<boolean>();
  
  showSnackbar(message : string, action:any, duration:number ){
    this.snackbar.open( message, action, {duration:duration});
  }
}
