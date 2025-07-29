import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { ResetPwdComponent } from './components/reset-pwd/reset-pwd.component';

const routes: Routes = [
  {
    path: 'Register',
    component: RegisterComponent,
  },
  {
    path: 'Verify/Email',
    component: VerifyEmailComponent,
  },
  {
    path: 'Reset/Password',
    component: ResetPwdComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
