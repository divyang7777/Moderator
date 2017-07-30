import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable";
import * as firebase from 'firebase';
import { Modals } from "../../pages/modals/modals";
import { HomePage } from "../../pages/home/home";


@Injectable()
export class Database {

  constructor(public http: Http) {
  }



  renderFeeds(): Observable<any> {
    try {
      return new Observable(observer => {
        let feed: any = [];
        firebase.database().ref('publicFeeds').orderByKey().once('value', (items: any) => {
          observer.next(feed);
          observer.complete();

          items.forEach((item) => {
            feed.push(item.val());
          });

          observer.next(feed.item);
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

  renderStory(): Observable<any> {
    try {
      return new Observable(observer => {
        let feed: any = [];
        firebase.database().ref('Moderator_Story').orderByKey().once('value', (items: any) => {
          observer.next(feed);
          observer.complete();

          items.forEach((item) => {
            feed.push(item.val());
          });

          observer.next(feed.item);
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
        let feed: any = [];
        firebase.database().ref('moderator').orderByKey().once('value', (items: any) => {
          observer.next(feed);
          observer.complete();

          items.forEach((item) => {
            feed.push(item.val());
          });

          observer.next(feed.item);
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

  // addUserfeed(userFeeds)
  // {
  //   return new Promise((resolve) =>
  // {
  //     let ref:any;

  //     ref = firebase.database().ref('userProfile/').orderByKey()
  //     .orderByChild('userFeed/').equalTo('uid');
  //     ref.push(userFeeds)

  //     resolve(true);
  //   });
    
  // }




  deleteMovie(id: any): Promise<any> {
    return new Promise((resolve) => {
      var ref = firebase.database().ref('moderator');
      ref.orderByChild('feed').equalTo(id).on('child_added', (snapshot) => {
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
      let addRef = firebase.database().ref('Moderator_Story');
      addRef.push(movieObj);
      resolve(true);
    });
  }



  updateDatabase(id, moviesObj): Promise<any> {
    return new Promise((resolve) => {
      var updateRef = firebase.database().ref('Moderator_Story').child(id);
      updateRef.update(moviesObj);
      resolve(true);
    });
  }



  uploadImage(imageString): Promise<any> {
    let image: string = 'movie-' + new Date().getTime() + '.jpg',
      storageRef: any,
      parseUpload: any;

    return new Promise((resolve, reject) => {
      storageRef = firebase.storage().ref('Image/' + image);
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