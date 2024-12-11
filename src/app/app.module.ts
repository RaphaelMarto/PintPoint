import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { ShareModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';

registerLocaleData(localeFr);

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ShareModule,
  ],
  providers: [provideHttpClient(),{ provide: LOCALE_ID, useValue: 'fr-FR' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
