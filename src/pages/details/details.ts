import { Component } from '@angular/core';
import { HttpModule } from '@angular/http';
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

  public userFeeds: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private _DB: Database,
    private platform: Platform,
    public http: Http) {
  }

  ionViewDidLoad() {
    this.platform.ready()
      .then(() => {
        this.renderModerator();
      });
  }

  renderModerator() {
    this.userFeeds = this._DB.renderModerator();
    console.log(this.userFeeds);
    // this._LOADER.hidePreloader();
  }

  // getAddress(){
  //   let url = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + 22.368060 + "," + 70.799651+"&key=AIzaSyAL0nTtl5z-ZjeN-FPDlQWD17VR7poo6U8"; 
  //   this.http.get(url).toPromise().then(res => console.log(res));
  // }

  ApproveFeeds(userFeed) {
    console.log(userFeed);
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('publicFeeds').push(userFeed)
        .then((data) => {
          this._DB.deleteMovie(userFeed);
          // location.reload();
        });
      resolve(true);
    });
  }




  DeleteFeeds(userFeeds) {
    console.log(userFeeds);
    this._DB.deleteMovie(userFeeds)
      .then((data) => {
        location.reload();
      });
  }




}