import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { passwordsMustMatchValidator } from 'src/app/validators/passwordsMustMatch';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {
  submitted = false;
  success: boolean = false;
  errorMessage: string = "";
  emailCode: string = "";

  newPasswordForm = new FormGroup({
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
  }, { validators: [passwordsMustMatchValidator] });

  constructor(
    private route: ActivatedRoute,
    private userService:UserService) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => this.emailCode = params['code']);  
  }

  onSubmit(){
      this.submitted = true;
      if(!this.newPasswordForm.valid)
          return;

      this.userService.changePassword(
          this.newPasswordForm.controls.password.value,
          this.emailCode
        )
        .subscribe({
          next: () => {
            this.success = true;
          },
          error: error => {
            this.success = false;
            this.errorMessage = error.error;
          }
        });         
  }

}
