import { Component } from '@angular/core';
import { fSignInForm } from '../../../../models/fSignIn';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  authForm = fSignInForm();
  showLogin: boolean = true;
  submit: boolean = false;
  logFail: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    this.submit = true;
    if (this.authForm.invalid) return;

    this.authService
      .Login(this.authForm.value.Email!, this.authForm.value.Password!)
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
}
