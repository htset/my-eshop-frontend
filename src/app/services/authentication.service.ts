import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { StoreService } from './store.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    public storeService: StoreService,
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(
        map(user => {
          sessionStorage.setItem('user', JSON.stringify(user));
          this.storeService.user = user;
          return user;
        })
      );
  }

  logout(refreshToken: string) {
    this.http.post<any>(`${environment.apiUrl}/users/revoke`, {refreshToken})
      .subscribe();
        
    this.storeService.cart.emptyCart();
    sessionStorage.removeItem('user');

    this.storeService.user = null;
  }

  refreshToken(token: string, refreshToken: string){
    console.log("auth service");
    return this.http.post<User>(`${environment.apiUrl}/users/refresh`, {token, refreshToken})
    .pipe(
      map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.storeService.user = user;
        return user;
      })
    );
  }
}
