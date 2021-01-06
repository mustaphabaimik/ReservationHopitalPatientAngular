import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hopital } from 'src/app/modules/hopital.module';
import { Service } from 'src/app/modules/service.module';
import { User } from 'src/app/modules/User.module';
import { HopitalService } from 'src/app/services/hopital.service';
import { LoginService } from 'src/app/services/login.service';
import { ServiceService } from 'src/app/services/service.service';
import { Rdv } from '../../modules/rdv.module';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  rdv=new Rdv();
  user=new User;
  authState:boolean;
  hopitaux:Hopital[];
  services:Service[];
  afficherservice=false;
  constructor(private loginservice:LoginService,private serviceservice:ServiceService,private router:Router,private hopitalservice:HopitalService,private toastr: ToastrService) { 
    
  }

  ngOnInit(): void {
    this.loginservice.authState$.
    subscribe(
      authState=>this.authState=authState
    );
    this.hopitalservice.getall()
    .subscribe((data:serverHopResponse)=>{
        this.hopitaux=data.hopitaux;
    });

  }

  

  prrdv(){
    alert(this.rdv.service);
    // if(this.authState==false){
    //   this.router.navigate(['/login']);
    // }

    // else{
    //   alert("hello");
    // }
     
  }

  selectedHopital(e){
     
    this.services=[];
    this.serviceservice.getservicesByHop(e.target.value)
    .subscribe((data:Servicesserverresponse)=>{
       
        this.services=data.services;
        if(this.services.length==0){
          this.afficherservice=false;
          this.toastr.error("aucun service dans l'hopital sélectionné","", {
            timeOut: 3500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
        }
        else{
          this.afficherservice=true;
        }
        
    },er=>{
     this.toastr.error(er,"Erreur", {
       timeOut: 3500,
       progressBar: true,
       progressAnimation: 'increasing',
       positionClass: 'toast-top-left'
     })
    });
 }

}

export interface serverHopResponse{
  hopitaux:Hopital[];
}
export interface Servicesserverresponse{
  services:Service[];
}
