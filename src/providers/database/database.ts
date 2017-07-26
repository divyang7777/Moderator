import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { Modals } from "../../pages/modals/modals";
import { HomePage } from "../../pages/home/home";


@Injectable()
export class Database {
  loadAndParseMovies: any;

  constructor(public http: Http) {
  }



  renderMovies(): Observable<any> {
    try {
      return new Observable(observer => {
        let films: any = [];
        // firebase.database().ref('films').remove(
        firebase.database().ref('films').orderByKey().once('value', (items: any) => {
          observer.next(films);
          observer.complete();

          items.forEach((item) => {
            films.push(item.val());
          });

          observer.next(films.item);
          observer.complete();
        },
          (error) => {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
          });

      });
    }
    catch (error) {
      console.log('Observable for retrieving films fails');
      console.dir(error);
    }
  }


  renderModerator(): Observable<any> {
    try {
      return new Observable(observer => {
        let moderator: any = [];
        firebase.database().ref('moderator/').orderByKey().once('value', (items: any) => {
          observer.next(moderator);
          observer.complete();

          items.forEach((item) => {
            moderator.push(item.val());
          });

          observer.next(moderator.item);
          observer.complete();
        },
          (error) => {
            console.log("Observer error: ", error);
            console.dir(error);
            observer.error(error)
          });

      });
    }
    catch (error) {
      console.log('Observable for retrieving moderator fails');
      console.dir(error);
    }
  }



  deleteMovie(id: any): Promise<any> {
    return new Promise((resolve) => {
      var ref = firebase.database().ref('moderator');
      ref.orderByChild('image').equalTo(id).on('child_added', (snapshot) => {
        snapshot.ref.remove()
      });
      // console.log(id);
      // var ref = firebase.database().ref('moderator');
      // ref.remove(id);

      // // firebase.database().ref('moderator').remove(id);

      resolve(true);
    });
  }



  addToDatabase(movieObj): Promise<any> {
    return new Promise((resolve) => {
      let addRef = firebase.database().ref('moderator');
      addRef.push(movieObj);
      resolve(true);
    });
  }



  updateDatabase(id, moviesObj): Promise<any> {
    return new Promise((resolve) => {
      var updateRef = firebase.database().ref('moderator').child(id);
      updateRef.update(moviesObj);
      resolve(true);
    });
  }



  uploadImage(imageString): Promise<any> {
    let image: string = 'movie-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('posters/' + image);
      parseUpload = storageRef.putString(imageString, 'data_url');

      parseUpload.on('state_changed', (_snapshot) => {
        // We could log the progress here IF necessary
        // console.log('snapshot progess ' + _snapshot);
      },
        (_err) => {
          reject(_err);
        },
        (success) => {
          resolve(parseUpload.snapshot);
        });
    });
  }


}