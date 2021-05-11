import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
import { from, Subscription } from 'rxjs';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  maxDate:Date;

  isLoadingSubs : Subscription;
  isLoading : boolean = false;

  constructor(
    private authService:AuthService,
    private uIService : UIService
    ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.maxDate.setFullYear( this.maxDate.getFullYear() - 18 );
    this.isLoadingSubs = this.uIService.loadingStateChanged.subscribe( ( isLoading : boolean ) => {
      this.isLoading = isLoading;
    });
  }

  onSubmit( form : NgForm ){
    let authData:AuthData = {email:form.value.email, password:form.value.password};
    this.authService.registerUser(authData);
  }

  ngOnDestroy(){
    if(this.isLoadingSubs){
      this.isLoadingSubs.unsubscribe();
    }
  }

}
