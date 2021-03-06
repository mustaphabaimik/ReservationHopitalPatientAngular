import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hopital } from '../modules/hopital.module';
import { serverProvincesResponse, serverRegionsResponse } from '../components/hopitaux/hopitaux.component';
import { serverHopResponse } from '../components/header/header.component';


@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  constructor(private http:HttpClient) { }


  getall(){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitaux");
  }

  getOne(id:number){
      return this.http.get("http://localhost:5000/api/hopitaux/"+id);
  }

  getByProvince(province:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitaux/"+province);
  }
  getByRegion(region:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitauxByRegion/"+region);
  }

  getByName(nom:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitauxByName/"+nom);
  }

  getByNameProvReg(nom:string,province:string,region:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/filterhopitaux/"+nom+"/"+province+"/"+region);
  }

  getByRegProv(province:string,region:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitauxByRegProv/"+region+"/"+province);
  }

  getByRegName(nom:string,region:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitauxByRegName/"+region+"/"+nom);
  }

  getByProvName(nom:string,province:string){
    return this.http.get<serverHopResponse>("http://localhost:5000/api/hopitauxByProvName/"+province+"/"+nom);
  }

 

  getRegions(){
    return this.http.get<serverRegionsResponse>("http://localhost:5000/api/regions");
  }

  getProvince(){
    return this.http.get<serverProvincesResponse>("http://localhost:5000/api/provinces");
  }
}
