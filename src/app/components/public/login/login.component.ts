import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = new FormGroup({});
  loading: boolean = false;
  submitted: boolean = false;
  error:string = '';

  constructor(
      private formBuilder: FormBuilder,
      public authenticationService: AuthenticationService,
      public route: ActivatedRoute,
      public router: Router
  ) {  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm?.invalid)
        return;

    this.loading = true;
    this.authenticationService.login(
      this.loginForm?.controls.username.value, 
      this.loginForm?.controls.password.value
    )
    .subscribe({
      next: () => {
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
      },
      error: error => {
          this.error = error.error.message;
          this.loading = false;
      }
    });
  }

}
