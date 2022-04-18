import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { StoreService } from '../services/store.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private storeService: StoreService,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = this.storeService.user;
    if (currentUser && currentUser.role == 'admin') {
      if(currentUser.token && !this.tokenExpired(currentUser.token))
        return true;

      return this.authenticationService
        .refreshToken(currentUser?.token || '', currentUser?.refreshToken || '')
        .pipe(
          map(e => {
            if(e)
              return true;
            else
              return false;
          }),
          catchError((err) => {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
            return of(false);
          })
        )
    }
    else if (currentUser && currentUser.role == 'customer') {
      if(currentUser.token && !this.tokenExpired(currentUser.token)){
        this.router.navigate(['/items']);
        return true;
      }

      return this.authenticationService
        .refreshToken(currentUser?.token || '', currentUser?.refreshToken || '')
        .pipe(
          map(e => {
            if(e)
              return true;
            else
              return false;
          }),
          catchError((err) => {
            this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
            return of(false);
          })
        );
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
    return false;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}