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
import { MedecinService } from 'src/app/services/medecin.service';
import { Medecin } from 'src/app/modules/medecin.module';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  rdv = new Rdv();
  user = new User;
  authState: boolean;
  hopitaux: Hopital[];
  services: Service[];
  afficherservice = false;
  medecins: Medecin[];
  affichermedecin: boolean = false;
  constructor(private loginservice: LoginService, private serviceservice: ServiceService, private medecinservice: MedecinService, private router: Router, private hopitalservice: HopitalService, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.loginservice.authState$.
      subscribe(
        authState => this.authState = authState
      );
    this.hopitalservice.getall()
      .subscribe((data: serverHopResponse) => {
        this.hopitaux = data.hopitaux;
      });

  }



  prrdv() {


    if (this.authState == false) {
      this.router.navigate(['/login']);
    }

    else {
      if (this.rdv.daterdv <= formatDate(new Date(), 'yyyy-MM-dd', 'en_US')) {

        this.toastr.error("Veuillez choisir une date supérieure à aujourd'hui", "Erreur", {
          timeOut: 3500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left'
        })
      }
      else {
        if (localStorage.getItem("typeuser") === "local") {
          
          this.rdv.user = Number(localStorage.getItem("iduser"));
          this.serviceservice.rdv(this.rdv)
            .subscribe(data => {
              this.toastr.success("votre rendez-vous a bien été pris", "", {
                timeOut: 3500,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-left'
              })
            }, err => {

              this.toastr.error(err.error.message, "Erreur", {
                timeOut: 3500,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-left'
              })
            })
        }
        else {
          this.rdv.SocialUser = localStorage.getItem("iduser");
          this.serviceservice.rdvsocialuser(this.rdv)
            .subscribe(data => {
              this.toastr.success("votre rendez-vous a bien été pris", "", {
                timeOut: 3500,
                progressBar: true,
                progressAnimation: 'increasing',
                positionClass: 'toast-top-left'
              })
            }, err => {
              alert(err.error.message);
            })
        }
      }



    }


  }

  selectedHopital(e) {

    this.services = [];
    this.medecins = [];
    this.serviceservice.getservicesByHop(e.target.value)
      .subscribe((data: Servicesserverresponse) => {

        this.services = data.services;
        if (this.services.length == 0) {
          this.afficherservice = false;
          this.toastr.error("aucun service dans l'hopital sélectionné", "", {
            timeOut: 3500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
        }
        else {
          this.afficherservice = true;
        }

      }, er => {
        this.toastr.error(er, "Erreur", {
          timeOut: 3500,
          progressBar: true,
          progressAnimation: 'increasing',
          positionClass: 'toast-top-left'
        })
      });
  }

  selectedService(e) {


    this.medecins = [];
    this.medecinservice.getbyservicesandhop(e.target.value, this.rdv.hopital)
      .subscribe(data => {
        this.medecins = data;
        if (this.medecins.length == 0) {
          this.affichermedecin = false;
          this.toastr.error("aucun medecin dans le service sélectionné", "", {
            timeOut: 3500,
            progressBar: true,
            progressAnimation: 'increasing',
            positionClass: 'toast-top-left'
          })
        }
        else {
          this.affichermedecin = true;
        }
      })

  }

}

export interface serverHopResponse {
  hopitaux: Hopital[];
}
export interface Servicesserverresponse {
  services: Service[];
}
