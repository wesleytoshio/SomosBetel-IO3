import { Component } from '@angular/core';
import { NavController, PopoverController, App, NavParams } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import firebase from 'firebase'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  eventModel = {} as Event;
  eventREF: AngularFirestoreCollection<Event>;
  eventDetails$: Observable<Event[]>

  constructor(
    public appCtrl: App, 
    public navParams: NavParams,
    private afs: AngularFirestore,
    public popoverCtrl: PopoverController,
    public navCtrl: NavController) {

      const firestore = firebase.firestore();
      const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);

       
      this.eventREF = this.afs.collection('Eventos', ref => ref.orderBy('eventDate', 'asc'))
      this.eventDetails$ = this.eventREF.valueChanges()

    
  }

//Menu Popover
presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent,
    });
    popover.onDidDismiss(popoverData=>{
     // console.log(popoverData)
    })
  }
}
