// import { Component } from '@angular/core';
// import { NavController, ModalController, Platform } from 'ionic-angular';
// import {FirebaseListObservable } from 'angularfire2/database';
// import { AngularFire} from 'angularfire2';

// import 'rxjs/add/operator/map';
// import * as firebase from 'firebase';

// @Component({
//   selector: 'page-home',
//   templateUrl: 'home.html'
// })
// export class HomePage {

//    public movies    : FirebaseListObservable<any[]>;


//    constructor(public navCtrl    : NavController,
//                private angFire   : AngularFire,
//                private modalCtrl : ModalController,
//                private platform  : Platform)
//    {

//    }



//    ionViewDidLoad()
//    {
//       this.platform.ready()
//       .then(() =>
//       {
//          this.movies = this.angFire.database.list('/films');
//       });
//    }



//    addRecord()
//    {
//       let modal = this.modalCtrl.create('Modals');
//       modal.present();
//    }



//    editMovie(movie)
//    {
//       let params = { movie: movie, isEdited: true },
//           modal  = this.modalCtrl.create('Modals', params);

//       modal.present();
//    }



//    deleteMovie(movie : any)
//    {
//       this.movies.remove(movie);
//    }

// }




import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { Modals } from '../../pages/modals/modals';
import { Preloader } from '../../providers/preloader/preloader';
import { Database } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Image } from "../../providers/image/image";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

   private auth     : '';
   public movies    : any;
   private email    : string = 'YOUR-EMAIL-ADDRESS';
   private pass     : string = 'PASSWORD-FOR-YOUR-EMAIL-ADDRESS';


   constructor( public navCtrl       : NavController,
                private platform     : Platform,
                private modalCtrl    : ModalController,
                private _IMG         : Image,
                private _LOADER      : Preloader,
                private _DB          : Database)
   {
   }


   ionViewDidEnter()
   {
      // this._LOADER.displayPreloader();
      this.platform.ready()
      .then(() =>
      {
        this.loadAndParseMovies();
         firebase.auth().signInWithEmailAndPassword(this.email, this.pass)
         .then((credentials) =>
         {
            this.loadAndParseMovies();
         })
         .catch((err : Error) =>
         {
            console.log(err.message);
         });
      });
   }


   loadAndParseMovies()
   {
      this.movies = this._DB.renderMovies();
      // this._LOADER.hidePreloader();
   }


   addRecord()
   {
      let modal = this.modalCtrl.create('Modals');
      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            // this._LOADER.displayPreloader();
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }


   editMovie(movie)
   {
      let params = { movie: movie, isEdited: true },
          modal  = this.modalCtrl.create('Modals', params);

      modal.onDidDismiss((data) =>
      {
         if(data)
         {
            // this._LOADER.displayPreloader();
            this.loadAndParseMovies();
         }
      });
      modal.present();
   }



   deleteMovie(movie)
   {
      // this._LOADER.displayPreloader();

      this._DB.deleteMovie(movie.id)
      .then((data) =>
      {
         this.loadAndParseMovies();
      });
   }


}