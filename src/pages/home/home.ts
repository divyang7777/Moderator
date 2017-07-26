import { Component } from '@angular/core';
import { NavController, Platform, ModalController } from 'ionic-angular';
import { Image } from '../../providers/image/image';
import { Preloader } from '../../providers/preloader/preloader';
import { Database } from '../../providers/database/database';
import * as firebase from 'firebase';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private auth: any;
  public movies: any;
  private email: string = 'YOUR-EMAIL-ADDRESS';
  private pass: string = 'PASSWORD-FOR-YOUR-EMAIL-ADDRESS';


  constructor(public navCtrl: NavController,
    private platform: Platform,
    private modalCtrl: ModalController,
    private _IMG: Image,
    private _LOADER: Preloader,
    private _DB: Database) {
  }



  ionViewDidEnter() {
    // this._LOADER.displayPreloader();
    this.platform.ready()
      .then(() => {
        this.loadAndParseMovies();
      });
  }

  loadAndParseMovies() {
    this.movies = this._DB.renderMovies();
    // this._LOADER.hidePreloader();
  }

  addRecord() {
    let modal = this.modalCtrl.create('Modals');
    modal.onDidDismiss((data) => {
      if (data) {
        // this._LOADER.displayPreloader();
        this.loadAndParseMovies();
      }
    });
    modal.present();
  }


}