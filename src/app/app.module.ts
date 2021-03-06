import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule } from 'angularfire2';

import { MyApp } from './app.component'; 
import { HomePage } from '../pages/home/home';
import { Database } from '../providers/database/database';
import { Image } from '../providers/image/image';
import { Preloader } from '../providers/preloader/preloader';
import { Camera } from "@ionic-native/camera";
import { TabsPage } from "../pages/tabs/tabs";
import { Modals } from "../pages/modals/modals";
import { DetailsPage } from "../pages/details/details";


export const firebaseConfig = {
    apiKey: "AIzaSyAC5irF8UKkq1MCbp-FEfV3RJjuexTaETM",
    authDomain: "signup-6d42c.firebaseapp.com",
    databaseURL: "https://signup-6d42c.firebaseio.com",
    projectId: "signup-6d42c",
    storageBucket: "signup-6d42c.appspot.com",
    messagingSenderId: "414822187127"
};


@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    DetailsPage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    DetailsPage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Database,
    Image,
    Preloader,
    Camera
  ]
})
export class AppModule {}
