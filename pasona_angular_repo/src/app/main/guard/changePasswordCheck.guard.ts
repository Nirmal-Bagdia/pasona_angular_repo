import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Injectable({
  providedIn: 'root',
})

export class changePasswordCheckGuard implements CanActivate {

  constructor(private router: Router, public pasonaService: PasonaServiceService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let roles = route.data["roles"] as Array<string>;
    var userData = this.pasonaService.getUserData();
    if (userData) {
      if (userData.pwdResetStatus == 0) {
        if (userData.userType == '1') {
          this.router.navigate(['/admin/changePassword']);
        }
        else if (userData.userType == '2') {
          this.router.navigate(['/company/changePassword']);
        }
        else if (userData.userType == '3') {
          this.router.navigate(['/unit/changePassword']);
        }
        else if (userData.userType == '4') {
          this.router.navigate(['/employee/changePassword']);
        }
        this.pasonaService.infoMessage('Please change your password first, only then you can get further access to the system!!');
        return false;
      }
    }
    // this.router.navigate(['/login']);
    return true;
  }
}

