import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { passwordsMustMatchValidator } from 'src/app/validators/passwordsMustMatch';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
    submitted = false;
    success:boolean = false;
    failure:boolean = false;
    errorMessage?: string;

    registrationForm = new FormGroup({
        firstName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(1)]),
        username: new FormControl('', [Validators.required, Validators.minLength(4)]),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
    }, { validators: [passwordsMustMatchValidator] });

    constructor(private userService:UserService,
                public authenticationService: AuthenticationService,
                public route: ActivatedRoute,
                public router: Router) { }

    ngOnInit(): void {
    }

    onSubmit(){
        console.warn(this.registrationForm.value);
        if(!this.registrationForm.valid)
            return;

        this.userService.addUser({
            firstName: this.registrationForm.controls.firstName.value,
            lastName: this.registrationForm.controls.lastName.value,
            username: this.registrationForm.controls.username.value,
            password: this.registrationForm.controls.password.value,
            email: this.registrationForm.controls.email.value
        })
        .subscribe(() => {
            const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
            this.router.navigate([returnUrl]);
        });
    }
}
