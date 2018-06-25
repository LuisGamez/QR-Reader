import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { Toast } from '@ionic-native/toast';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { WelcomePage } from '../pages/welcome/welcome';
import { HomePage } from '../pages/home/home';
import { RechumPage } from '../pages/rechum/rechum';
import { DataPacienteProvider } from '../providers/data-paciente/data-paciente';
import { DetalleExpedientePage } from '../pages/detalle-expediente/detalle-expediente';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ZoomAreaModule } from 'ionic2-zoom-area';
import { SegindPage } from '../pages/segind/segind';

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    HomePage,
    RechumPage,
    SegindPage,
    DetalleExpedientePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    BrowserAnimationsModule,
    HttpClientModule,
    ZoomAreaModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    HomePage,
    RechumPage,
    SegindPage,
    DetalleExpedientePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BarcodeScanner,
    Toast,
    DataPacienteProvider,
    DataPacienteProvider
  ]
})
export class AppModule {}