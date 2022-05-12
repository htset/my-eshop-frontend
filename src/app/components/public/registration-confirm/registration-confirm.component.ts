import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, mergeMap, tap } from 'rxjs/operators';
import { StoreService } from 'src/app/services/store.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.css']
})
export class RegistrationConfirmComponent implements OnInit {

  result: string = "";

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public storeService: StoreService,
    private router: Router
  ) { }

  ngOnInit(): void {
    let code = '';
    this.route.queryParams.pipe(
      tap(params => code = params['code']),
      mergeMap(params => this.userService.confirmRegistration(code)),
      map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.storeService.user = user;
        return user;
      })
    )
    .subscribe({
      next: () => {
        this.result = "Registration was successfully confirmed";
      },
      error: error => {
        this.result = "Registration confirmation failed. " + error.error;
      }
    });  
  }
}
