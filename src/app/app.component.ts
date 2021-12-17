import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './models/user';
import { AuthenticationService } from './services/authentication.service';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  user: User|null = null;

  constructor(
      private router: Router,
      public authenticationService: AuthenticationService,
      public storeService: StoreService
  ) {
      this.storeService.user$.subscribe(x => this.user = x);
  }

  logout(e: Event) {
    e.preventDefault();
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
