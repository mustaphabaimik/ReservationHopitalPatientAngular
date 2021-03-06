import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Servicesserverresponse } from '../components/header/header.component';
import { Rdv } from '../modules/rdv.module';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http:HttpClient) { }


  getservicesByHop(idHopital:number){
    return this.http.get<Servicesserverresponse>("http://localhost:5000/api/servicesByHop/"+idHopital);
  }




  rdv(rdv:Rdv){
    return this.http.post("http://localhost:5000/api/rdv",rdv);
  }


  rdvsocialuser(rdv:Rdv){
    return this.http.post("http://localhost:5000/api/rdvsocialuser",rdv);
  }
}
