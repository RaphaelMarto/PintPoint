import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavbarComponent } from './navbar/navbar.component';
import { MenubarModule } from 'primeng/menubar';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { AuthModule } from "../pages/auth/auth.module";
import { UsersRatingListModule } from '../pages/users-rating-list/users-rating-list.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NavbarComponent, FooterComponent],
  imports: [CommonModule, MenubarModule, ButtonModule, AuthModule, UsersRatingListModule, MenuModule],
  exports: [NavbarComponent, FooterComponent],
})
export class ShareModule {}
