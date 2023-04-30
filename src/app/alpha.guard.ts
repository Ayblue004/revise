import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { RefreshService } from './refresh.service';

@Injectable({
  providedIn: 'root'
})
export class AlphaGuard implements CanActivate {
  constructor(
    private refresh: RefreshService
  ){
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.refresh.refresh){
      return true;
    }
    else{
      return false;
    }
  }
  
}
