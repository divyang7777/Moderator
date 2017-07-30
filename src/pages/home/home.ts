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

  public stories: any;

  constructor(public navCtrl: NavController,
    private modalCtrl: ModalController,
    private _DB: Database) {
  }



  ionViewDidEnter() {
      this.stories = this._DB.renderStory();
  }


  addRecord() {
    let modal = this.modalCtrl.create('Modals');
    modal.onDidDismiss((data) => {
      if (data) {
        this.stories = this._DB.renderStory();
      }
    });
    modal.present();
  }


}