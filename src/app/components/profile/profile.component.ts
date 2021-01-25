import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { User } from 'src/app/modules/User.module';
import { map } from 'rxjs/operators'; 
import { ToastrService } from 'ngx-toastr';
import { RdvService } from 'src/app/services/rdv.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  myUser:any;
  user:SocialUser;
  afficherRdv:boolean=true;
  tab:any[];
  constructor(private authservice:SocialAuthService,
    private loginservice:LoginService,
    private router:Router,
    private toastr:ToastrService,
    private rdvservice:RdvService) { 
    
    }

  ngOnInit(): void {
    this.loginservice.userData$
    .pipe(
       map((userr:SocialUser|User)=>{
           if(userr instanceof SocialUser){
            
             return {
               email:"test@test.com",
               ...userr
              // ...this.user
               
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

    if(localStorage.getItem("typeuser")==="social"){
      this.rdvservice.getall(localStorage.getItem("iduser"))
      .subscribe((data:rdvServerResponse[])=>{
        this.tab=data;
      });
    }
    else if(localStorage.getItem("typeuser")==="local"){
      this.rdvservice.getallrdv(Number(localStorage.getItem("iduser")))
      .subscribe((data:rdvServerResponse[])=>{
        this.tab=data;
      });   
    }
   
  }


  logout(){
    this.loginservice.logout();
  }

  showrdv(){
    this.afficherRdv=true;
  }

}

export interface rdvServerResponse{
  "id": number;
  "daterdv": String;
  "heurerdv": String,
  "hopital": String,
  "service": string,
  "medecin": string
}
