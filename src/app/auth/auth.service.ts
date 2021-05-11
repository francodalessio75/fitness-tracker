import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthService{
  //notifies authentication events
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth : AngularFireAuth,
    private trainingService: TrainingService,
    private uIService : UIService ){}

    //calls embedded observable of firebase
    initAuthListener(){
      //receives a user object that is null if there's no authenticated user
      this.afAuth.authState.subscribe( user => {
        if(user){
          this.isAuthenticated = true;
          this.authChange.next(true);
          this.router.navigate(['/training']);
        }else{
          //unsubscribes observables that call firebase that throw errors when user is not authenticated
          this.trainingService.cancelSubscription();
          this.authChange.next(false);
          this.router.navigate(['/login']);
          this.isAuthenticated = false;
        }
      });
    }

  registerUser( authData:AuthData ){
    this.uIService.loadingStateChanged.next(true);
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then( result => {
      this.uIService.loadingStateChanged.next(false)
    })
    .catch(error => {
      this.uIService.loadingStateChanged.next(false);
      this.uIService.showSnackbar(error.message, null, 3000);
    });
  }

  login( authData:AuthData ){
    this.uIService.loadingStateChanged.next(true);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then( result =>{
      this.uIService.loadingStateChanged.next(false);
    })
    .catch(error => {
      this.uIService.loadingStateChanged.next(false);
      this.uIService.showSnackbar(error.message, null, 3000);
    });
  }

  isAuth():boolean{
    return this.isAuthenticated;
  }

  logout(){
    this.afAuth.signOut();
  }
}
