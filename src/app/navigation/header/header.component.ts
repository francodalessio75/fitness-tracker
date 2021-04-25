import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuth:boolean = false;
  authSubscription:Subscription;

  @Output() sideNavToggle = new EventEmitter<void>();

  constructor( private authService:AuthService) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authChange.subscribe( authStatus => {
      this.isAuth = authStatus;
    });
  }

  onToggleSideNav(){
    this.sideNavToggle.emit();
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
    this.authSubscription.unsubscribe();
  }

}
