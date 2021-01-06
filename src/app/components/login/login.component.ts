import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/modules/User.module';
import { LoginService } from 'src/app/services/login.service';
import { SocialAuthService } from "angularx-social-login";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user=new User;
  auth:string;
  constructor(private authservice:SocialAuthService,
    private router:Router,
    private loginservice:LoginService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    
   
  
    this.loginservice.authState$.subscribe(authState=>{
     
          console.log(authState);
          if(authState){
          
            this.router.navigateByUrl(this.route.snapshot.queryParams['returnUrl'] || '/profile');
            
          }
          else{
            
            this.router.navigateByUrl('/login');
          }
    });

  }

  login(){ 
       this.loginservice.login(this.user.email,this.user.password);
      
  }

  googlelogin(){
    this.loginservice.googlelogin();
   
  }

}
