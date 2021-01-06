import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login.service'

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard implements CanActivate {


  constructor(private loginservice:LoginService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.loginservice.auth){
     
        return true;
      }
     
       
      this.router.navigate(['/login']);
  }
  
}
