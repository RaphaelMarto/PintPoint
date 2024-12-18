import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { ButtonModule } from 'primeng/button';
import { AuthModule } from "../pages/auth/auth.module";

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, MenubarModule, ButtonModule, AuthModule],
  exports: [NavbarComponent],
})
export class ShareModule {}
