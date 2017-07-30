import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Image } from '../../providers/image/image';
import { Preloader } from '../../providers/preloader/preloader';
import { Database } from '../../providers/database/database';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-modals',
  templateUrl: 'modals.html'
})
export class Modals {

   public form             : any;
   public storyImage  	   : any;
   public stories           : any;
   public thisImage       : any     = '';
   public storySummary     : any     = '';
   public storyId          : string  = '';
   public isEditable       : boolean = false;
   public StoryName        : any;

   constructor(
      public navCtrl        : NavController,
      public params         : NavParams,
      private _FB 	        : FormBuilder,
      private _IMG          : Image,
      public viewCtrl       : ViewController,
      private _LOADER       : Preloader,
      private _DB           : Database
   )
   {
      this.form 		= _FB.group({
         'summary' 		: ['', Validators.minLength(10)],
         'image'		: ['', Validators.required],
         'name' 		: ['', Validators.required]
        });

      this.stories = firebase.database().ref('Moderator_Story/');


      if(params.get('isEdited'))
      {
          let story 		    = params.get('story'),
              k;
          this.StoryName	    = story.title;
          this.storySummary   	= story.summary;
          this.thisImage       = story.image;
          this.storyImage        = story.image;
          this.storyId          = story.id;

          this.isEditable      = true;
      }
   }




   savestory(val)
   {
       let  summary 	: string 	= this.form.controls["summary"].value,
            title	    : string	= this.form.controls["name"].value,
  		    image       : string    = this.storyImage
  		


      if(this.isEditable)
      {

         if(image !== this.thisImage)
         {
            this._DB.uploadImage(image)
            .then((snapshot : any) =>
            {
               let uploadedImage : any = snapshot.downloadURL;

               this._DB.updateDatabase(this.storyId,
               {
                    summary  : summary,
                    title    : title,
	                image    : uploadedImage
	            })
            });
         }
         else
         {

           this._DB.updateDatabase(this.storyId,
           {
                title    : title,
	            summary  : summary
	       })
	     }

      }
      else
      {
         this._DB.uploadImage(image)
         .then((snapshot : any) =>
         {
            let uploadedImage : any = snapshot.downloadURL;

            this._DB.addToDatabase({
	            image    : uploadedImage,
                title    : title,
                summary  : summary
	        })
         });

      }
      this.closeModal(true);
   }



   closeModal(val = null)
   {
      this.viewCtrl.dismiss(val);
   }



   selectImage()
   {
      this._IMG.selectImage()
      .then((data) =>
      {
         this.storyImage = data;
      });
   }


}