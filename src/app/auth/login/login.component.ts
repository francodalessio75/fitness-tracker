import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UIService } from 'src/app/shared/ui.service';
import { AuthData } from '../auth-data.model';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isLoading = false;
  private loadingSubs:Subscription;

  constructor( private authService : AuthService, private uIService:UIService ) {}

  ngOnInit() {
     this.loadingSubs = this.uIService.loadingStateChanged.subscribe( (isLoadingState:boolean) => {
       this.isLoading = isLoadingState;
     });

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

  ngOnDestroy(){
    if( this.loadingSubs ){
      this.loadingSubs.unsubscribe();
    }
  }
}
