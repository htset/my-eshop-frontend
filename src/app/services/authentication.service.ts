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

  logout() {
    sessionStorage.removeItem('user');
    this.storeService.user = null;
  }
}
