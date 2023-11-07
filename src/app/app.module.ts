import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { SplashScreenComponent } from './pages/splash-screen/splash-screen.component';
import { StatusComponent } from './pages/status/status.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ToFixedPipe } from './pipes/to-fixed.pipe';
import { HoursMinutesSecondsPipe } from './pipes/hours-minutes-seconds.pipe';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    SplashScreenComponent,
    StatusComponent,
    HeaderComponent,
    FooterComponent,
    ToFixedPipe,
    HoursMinutesSecondsPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideDatabase(() => getDatabase())
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
