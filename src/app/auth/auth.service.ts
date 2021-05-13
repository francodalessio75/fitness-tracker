import { Injectable } from "@angular/core";
import { AuthData } from "./auth-data.model";
import { Subject } from "rxjs";
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth'
import { TrainingService } from "../training/training.service";
import { UIService } from "../shared/ui.service";
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from "@ngrx/store";
import  * as fromRoot from '../app.reducer';
import  * as UI  from '../shared/ui.action';

@Injectable()
export class AuthService{
  //notifies authentication events
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private afAuth : AngularFireAuth,
    private trainingService: TrainingService,
    private uIService : UIService,
    private store : Store<fromRoot.State> ){}

    //calls embedded observable of firebase
    initAuthListener(){
      this.store.dispatch(new UI.StartLoading);
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
          //this.isAuthenticated = false;
          this.store.dispatch(new UI.StopLoading);;
        }
      });
    }

  registerUser( authData:AuthData ){
    //this.uIService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading);
    this.afAuth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then( result => {
      //this.uIService.loadingStateChanged.next(false)
      this.store.dispatch(new UI.StopLoading);
    })
    .catch(error => {
      //this.uIService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
      this.uIService.showSnackbar(error.message, null, 3000);
    });
  }

  login( authData:AuthData ){
    //this.uIService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading);
    this.afAuth.signInWithEmailAndPassword(authData.email, authData.password)
    .then( result =>{
      //this.uIService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
    })
    .catch(error => {
      //this.uIService.loadingStateChanged.next(false);
      this.store.dispatch(new UI.StopLoading);
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
