import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { User } from 'src/app/modules/User.module';
import { map } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myUser:any;
  constructor(private authservice:SocialAuthService,
    private loginservice:LoginService,
    private router:Router,
    private toastr:ToastrService) { }

  ngOnInit(): void {

    this.loginservice.userData$
    .pipe(
       map((userr:SocialUser|User)=>{
           if(userr instanceof SocialUser){
             return {
               email:"test@test.com",
               ...userr
             };
           }
           else{
             return userr;
           }
       })
    )
    .subscribe((data:SocialUser|User)=>{
        this.myUser=data;
        console.log(data);
    });
  }


  logout(){
    this.loginservice.logout();
  }

}
