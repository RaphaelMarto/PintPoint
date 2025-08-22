import { Component } from '@angular/core';
import { fSignInForm } from '../../../../models/fSignIn';
import { AuthService } from '../../../service/auth.service';
import { fEmailForm } from '../../../../models/fEmailFrom';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  authForm = fSignInForm();
  emailForm = fEmailForm();
  showLogin: boolean = true;
  submit: boolean = false;
  logFail: boolean = false;
  forgotPassword: boolean = false;
  CodeSent: boolean = false;
  //message: string = "";
  error: boolean = false;

  constructor(private authService: AuthService) { }

  onSubmit(): void {
    this.submit = true;
    if (this.authForm.invalid) return;
    
    this.authService
      .Login(this.authForm.value.Email!, this.authForm.value.Password!, this.authForm.value.RememberMe!)
      .subscribe({
        next: (isLoggedIn: boolean) => {
          if (isLoggedIn) {
            this.authService.emitIsShowned();
          }
        },
        error: (err) => {
          this.logFail = true;
        },
      });
  }

  hideLogin(): void {
    this.authService.emitIsShowned();
  }

  onForgotPassword(): void {
    this.forgotPassword = true;
  }

  SubmitForgotPassword(): void {
    this.authService
      .getPasswordCode(this.emailForm.get('Email')!.value!)
      .subscribe({
          next: (response) => {
            this.CodeSent = true;
            this.forgotPassword = false;
          },
          error: (err) => {
            console.error(err);
            this.error = true;
            //this.message = err.error.errorMessage
          },
        }
      );
  }
}

