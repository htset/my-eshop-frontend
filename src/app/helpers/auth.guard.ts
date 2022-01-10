import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StoreService } from '../services/store.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storeService: StoreService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.storeService.user;
    if (currentUser && currentUser.role == 'admin') {
        return true;
    }
    else if (currentUser && currentUser.role == 'customer') {
      this.router.navigate(['/items']);
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
    return false;
  }
}