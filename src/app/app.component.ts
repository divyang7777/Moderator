import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from "../pages/tabs/tabs";
import { HomePage } from '../pages/home/home';  
import * as firebase from 'firebase';


// export const firebaseConfig = {
//     apiKey: "AIzaSyBj5LCPKCO4DBs85MOzbkpUfmpf7l-YQjQ",
//     authDomain: "moderator-94a7b.firebaseapp.com",
//     databaseURL: "https://moderator-94a7b.firebaseio.com",
//     projectId: "moderator-94a7b",
//     storageBucket: "moderator-94a7b.appspot.com",
//     messagingSenderId: "848624939331"
// };


export const firebaseConfig = {
      apiKey: "AIzaSyAC5irF8UKkq1MCbp-FEfV3RJjuexTaETM",
      authDomain: "signup-6d42c.firebaseapp.com",
      databaseURL: "https://signup-6d42c.firebaseio.com",
      projectId: "signup-6d42c",
      storageBucket: "signup-6d42c.appspot.com",
      messagingSenderId: "414822187127"
};

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage = TabsPage;

   constructor(platform: Platform) {
      platform.ready()
      .then(() =>
      {
         // Okay, so the platform is ready and our plugins are available.
         // Here you can do any higher level native things you might need.
        //  StatusBar.styleDefault();
        // SplashScreen.hide();
      });

      firebase.initializeApp(firebaseConfig);
   }
}
