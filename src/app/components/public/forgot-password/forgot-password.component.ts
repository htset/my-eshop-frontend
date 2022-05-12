import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  submitted = false;
  success: boolean = false;
  errorMessage: string = "";

  constructor(private userService:UserService) { }

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  ngOnInit(): void {
  }

  onSubmit(){
    console.warn(this.forgotForm.value);
    this.submitted = true;

    if(!this.forgotForm.valid)
        return;

    this.userService.resetPassword(this.forgotForm.controls.email.value)
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
