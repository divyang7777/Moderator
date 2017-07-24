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

export const firebaseConfig = {
    apiKey: "AIzaSyBj5LCPKCO4DBs85MOzbkpUfmpf7l-YQjQ",
    authDomain: "moderator-94a7b.firebaseapp.com",
    databaseURL: "https://moderator-94a7b.firebaseio.com",
    projectId: "moderator-94a7b",
    storageBucket: "moderator-94a7b.appspot.com",
    messagingSenderId: "848624939331"
};


@NgModule({
  declarations: [
    MyApp,
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
