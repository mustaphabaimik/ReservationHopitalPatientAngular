import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SocialAuthService,SocialUser } from "angularx-social-login";
import { BehaviorSubject } from 'rxjs';
import {  GoogleLoginProvider } from "angularx-social-login";
import { User } from '../modules/User.module';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class LoginService {


  auth:boolean=false;
  private url="";
  private user;
  authState$=new BehaviorSubject<boolean>(this.auth);
  userData$=new BehaviorSubject<SocialUser | User>(null);


  constructor(private http:HttpClient,private authservice:SocialAuthService,private toastr:ToastrService) {
        authservice.authState.subscribe((userr:SocialUser) => {
          if(userr!==null){     
        
            localStorage.setItem("tokensocialuser",userr.authToken);
            localStorage.setItem("typeuser","social");
            localStorage.setItem("iduser",userr.id.toString());
            localStorage.setItem("emailuser",userr.email.toString());
            this.auth=true;
            this.authState$.next(this.auth);
            this.userData$.next(userr);
          }
        });
       
   }

  login(email:string,password:string){
    
      this.http.post("http://localhost:5000/api/signin",{email,password})
      .subscribe((data:serverresponse)=>{
          this.auth=true;
          localStorage.setItem("typeuser","local");
          localStorage.setItem("iduser",data.user.id.toString());
          localStorage.setItem("emailuser",data.user.email);
          
          this.authState$.next(this.auth);
          this.userData$.next(data.user);
          console.log(data);
          this.toastr.success(`Nous sommes ravis de vous revoir ${data.user.nom} ${data.user.prenom}`,"", {
            timeOut: 3500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
      },err=>{
           this.toastr.error(err.error.message,"Erreur", {
            timeOut: 35000,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
      });

      // return this.http.post("http://localhost:5000/api/signin",{email,password});
      

  }


  googlelogin(){
    this.authservice.signIn(GoogleLoginProvider.PROVIDER_ID).then(user=>{

      this.toastr.success(`Nous sommes ravis de vous revoir ${user.name}`,"", {
        timeOut: 3500,
        progressBar: true,
        progressAnimation: 'increasing',
        positionClass: 'toast-top-left'
      })
    });
   
    
  }


  inscription(formdata:FormData){
    return this.http.post("http://localhost:5000/api/signup",formdata);
  }
  logout(){
    this.authservice.signOut();
    // this.authState$.next(this.auth);
    sessionStorage.setItem('auth',"false");
     this.auth=false;
     // this.auth=true;
     this.authState$.next(this.auth);
  }

  getall(){
    return this.http.get("http://localhost:5000/api/getall");
  }
}


interface serverresponse{
  message:string,
  user:User,
  status:number,
  token:string
}


