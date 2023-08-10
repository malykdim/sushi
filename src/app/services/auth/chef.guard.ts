import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { take, map, tap } from "rxjs/operators";

import { AuthService } from "./auth.service";

@Injectable({ providedIn: 'root'})
export class ChefGuard implements CanActivate {
  constructor(private authService:AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      return this.authService.user.pipe(
            take(1),
            map(user => {
              const isChef = user.role === 'chef';

              if (isChef) {
                return true;
              }

              return this.router.createUrlTree(['/auth']);
            })
        );
  }
}