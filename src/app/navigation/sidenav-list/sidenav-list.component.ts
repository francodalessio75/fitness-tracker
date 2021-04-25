import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent implements OnInit {

  @Output() closeSideNav = new EventEmitter<void>();

  constructor( private authService:AuthService) { }

  ngOnInit(): void {
  }

  close(){
    this.closeSideNav.emit();
  }

  onLogout(){
    this.close();
    this.authService.logout();
  }

}
