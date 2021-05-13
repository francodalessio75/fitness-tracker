import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { Subscription, Observable } from 'rxjs';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  isLoading$ : Observable<boolean>;
  private loadingSubs:Subscription;

  constructor(
    private authService : AuthService,
    private uIService:UIService,
    private store:Store<fromRoot.State> ) {}

  ngOnInit() {
    console.log(fromRoot.getIsLoading);
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    //  this.loadingSubs = this.uIService.loadingStateChanged.subscribe( (isLoadingState:boolean) => {
    //    this.isLoading$ = this.store.map(state => state.ui.isLoading);
    //  });
     this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email]
      }),
      password: new FormControl('', { validators: [Validators.required] })
    });
  }

  onSubmit() {
    let authData:AuthData = { email:this.loginForm.value.email, password:this.loginForm.value.password };
    this.authService.login( authData );
  }

  // ngOnDestroy(){
  //   if( this.loadingSubs ){
  //     this.loadingSubs.unsubscribe();
  //   }
  // }
}
