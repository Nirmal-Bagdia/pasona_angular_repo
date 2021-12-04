import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { CanActivate } from '@angular/router';
import { PasonaServiceService } from 'app/share/pasona-service.service';

@Injectable({
  providedIn: 'root',
})

export class RoleGuard implements CanActivate {

  constructor(private router: Router, private pasonaService: PasonaServiceService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    var url: string = route.url.join('');
    let roles = route.data["roles"] as Array<string>;
    var moduleDetails = this.pasonaService.getRoleModule(roles[0]);
    if (!moduleDetails) {
      moduleDetails = { moduleId: 10, read: true, write: true };
    }
    // debugger;
    if (moduleDetails) {
      if (moduleDetails.moduleId == roles[0]) {
        if (roles[1]) {
          if (moduleDetails.write) {
            return true;
          }
          else {
            this.router.navigate(['/employee/dashboard']);
            return false;
          }
        }
        else {
          return true;
        }
      }
    }
    this.router.navigate(['/employee/dashboard']);
    return false;
  }
}

