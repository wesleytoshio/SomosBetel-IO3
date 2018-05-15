import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import firebase from 'firebase'
import { AngularFirestore } from "angularfire2/firestore";
import 'rxjs/add/operator/map';
import {Validators, FormBuilder } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {

  registerEvent: any = {};

  constructor(
    public appCtrl: App,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    private afDatabase: AngularFirestore,
  ) {

      
    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    //validators form         
    this.registerEvent = this.formBuilder.group({
      title: ['', Validators.required],
      descriptionShort: ['', Validators.required],
      eventDate: ['', Validators.required], 
      eventHour: ['', Validators.required],  
      eventLocal: ['', Validators.required],          
    });      


}

  createEvent(registerEvent){
    const createDate = firebase.firestore.FieldValue.serverTimestamp(); //Timestamp Date Event Post Created
    
    //save Event Details e in firestore Doc
    this.afDatabase.collection(`Eventos`).add({
               creatAt: createDate,
               title: this.registerEvent.value.title,
               descriptionShort: this.registerEvent.value.descriptionShort,
              // eventDateISO: new Date(this.registerEvent.value.eventDate), //formato timestamp
               eventDate: this.registerEvent.value.eventDate,
               eventHour: this.registerEvent.value.eventHour,
               eventLocal: this.registerEvent.value.eventLocal,
      })
     .then((response) => {
      //console.log(response.id),
      const docID = response.id
      this.appCtrl.getRootNav().setRoot('UploadPage', {id: docID}) //go to Upload Page
      //this.navCtrl.push('AdminPage')
    }
      );
  }


   cancel(){
      this.appCtrl.getRootNav().setRoot('AdminPage')
   }

   ionViewDidLoad() {
    // console.log('ionViewDidLoad EventCreatePage');
   }
 

}
