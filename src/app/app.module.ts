import { ToastModule } from 'primeng/toast';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ShareModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { authInterceptor } from '../interceptor/auth-interceptor.interceptor';
import { ButtonModule } from 'primeng/button';
import { PagesModule } from './pages/pages.module';
import { MessageService } from 'primeng/api';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule,
    ButtonModule,
    PagesModule,
    ToastModule,
  ],
  providers: [provideHttpClient(withInterceptors([authInterceptor])),{ provide: LOCALE_ID, useValue: 'fr-FR' }, MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
