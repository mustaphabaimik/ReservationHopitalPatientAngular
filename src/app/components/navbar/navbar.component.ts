import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  authState:boolean;
  constructor(private loginservice:LoginService) { }

  ngOnInit(): void {


    this.loginservice.authState$.
    subscribe(
      authState=>this.authState=authState
    );
    
  }

}
