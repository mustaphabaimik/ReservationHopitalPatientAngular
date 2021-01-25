import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RdvService {

  private url="";
  constructor(private http:HttpClient) { 
    this.url="http://localhost:5000/api";
  }

  getall(user){
    return this.http.get(this.url+"/socialUserRdv/"+user);
  }

  getallrdv(user){
    return this.http.get(this.url+"/localUserRdv/"+user);
  }
}
