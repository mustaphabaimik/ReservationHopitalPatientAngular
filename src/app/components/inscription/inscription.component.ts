import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/modules/User.module';
import { LoginService } from 'src/app/services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  user = new User;
  formData;
  image;
  constructor(private loginservice: LoginService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
  }


  inscription() {
    this.formData = new FormData();
    this.formData.append("nom", this.user.nom);
    this.formData.append("prenom", this.user.prenom);
    this.formData.append("email", this.user.email);
    this.formData.append("password", this.user.password);
    this.formData.append("photoUrl", this.image);
    this.formData.append("role", "patient");

    console.log(this.formData);

    this.loginservice.inscription(this.formData)
      .subscribe((data: serverresponse) => {
        this.router.navigate(['/login']);
        this.toastr.success(data.message, "félicitations", {
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


  fileisselected(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

}


interface serverresponse {
  message: string;
}
