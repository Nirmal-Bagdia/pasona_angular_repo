import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { PasonaServiceService } from 'app/share/pasona-service.service';
import { FuseNavigationService } from '@fuse/components/navigation/navigation.service';

@Injectable({
  providedIn: 'root',
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, public pasonaService: PasonaServiceService, private _fuseNavigationService: FuseNavigationService, ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = route.data["roles"] as Array<string>;
    var companyId = JSON.parse(localStorage.getItem('pasonaUserDetails'));
    var userData = this.pasonaService.getUserData();
    if (userData) {
      if (userData.userType == roles[0]) {

        return true;
      }
    }
    else if (companyId) {
      this.router.navigate(['/login/', companyId]);
      this._fuseNavigationService.unregister('main');
      return false;
    }
    this.router.navigate(['/login']);
    this._fuseNavigationService.unregister('main');
    return false;
  }
}


