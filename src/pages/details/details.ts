import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, Platform } from 'ionic-angular';
import { Modals } from '../../pages/modals/modals';
import { Database } from "../../providers/database/database";
import { HomePage } from "../../pages/home/home";
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';

/**
 * Generated class for the DetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {
  
  public loadAndParseMovies: any;
  public movies: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _DB: Database,
    private platform: Platform ) {
  }

  ionViewDidLoad() {
    this.platform.ready()
      .then(() => {
        this.renderModerator();
      });
  }

  renderModerator() {
    this.movies = this._DB.renderModerator();
    // this._LOADER.hidePreloader();
  }

  editMovie(movie) {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('films/');
      addRef.push(movie);
      this._DB.deleteMovie(movie);
      resolve(true);

    });
  }

  deleteMovie(_movie) {
    // this._LOADER.displayPreloader();
    console.log(_movie);
    this._DB.deleteMovie(_movie)
      .then((data) => {
        // this.loadAndParseMovies();
      });
  }


}