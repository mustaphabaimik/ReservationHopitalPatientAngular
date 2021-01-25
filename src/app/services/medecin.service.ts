import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../modules/User.module';
import { Medecin } from '../modules/medecin.module';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class MedecinService {

  private url="";
  constructor(private http:HttpClient,private toastr: ToastrService) { 
    this.url="http://localhost:5000/api";
  }

  getall(){
    return this.http.get<Medecin[]>(this.url+"/medecins");
  }


  getbyservicesandhop(service:number,hopital:number){
    return this.http.get<Medecin[]>(this.url+"/medecinByService/"+service+"/"+hopital); 
  }







  
}
