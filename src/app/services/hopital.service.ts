import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hopital } from '../modules/hopital.module';


@Injectable({
  providedIn: 'root'
})
export class HopitalService {

  constructor(private http:HttpClient) { }


  getall(){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitaux");
  }

  getByProvince(province:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitaux/"+province);
  }
  getByRegion(region:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitauxByRegion/"+region);
  }

  getByName(nom:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitauxByName/"+nom);
  }

  getByNameProvReg(nom:string,province:string,region:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/filterhopitaux/"+nom+"/"+province+"/"+region);
  }

  getByRegProv(province:string,region:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitauxByRegProv/"+region+"/"+province);
  }

  getByRegName(nom:string,region:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitauxByRegName/"+region+"/"+nom);
  }

  getByProvName(nom:string,province:string){
    return this.http.get<Hopital[]>("http://localhost:5000/api/hopitauxByProvName/"+province+"/"+nom);
  }

 

  getRegions(){
    return this.http.get<Hopital[]>("http://localhost:5000/api/regions");
  }

  getProvince(){
    return this.http.get<Hopital[]>("http://localhost:5000/api/provinces");
  }
}
