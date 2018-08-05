import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";


@Injectable()
export class AuthguardService implements CanActivate{

  constructor(private router:Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(localStorage.getItem("currentUser")){
    //  console.log("set1");
      return true;
    }

    this.router.navigate(['/']);
    return false;
  }

}
