import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { DialogModule } from 'primeng/dialog';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { AuthComponent } from './auth.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { CheckboxModule } from 'primeng/checkbox';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';


@NgModule({
  declarations: [AuthComponent, RegisterComponent, SignInComponent, VerifyEmailComponent, ResetPwdComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    FloatLabelModule,
    DialogModule,
    PasswordModule,
    DropdownModule,
    CalendarModule,
    InputNumberModule,
    CheckboxModule,
    ProgressSpinnerModule,
  ],
  exports: [SignInComponent]
})
export class AuthModule { }
