import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Notification } from '../../Models/Notification';



@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notification = {} as Notification;
  notificationREF: AngularFirestoreCollection<Event>;
  notificationDetails$: Observable<Event[]>

  constructor(
    public navParams: NavParams,
    private afs: AngularFirestore,
    public navCtrl: NavController) {

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

     
    this.notificationREF = this.afs.collection('Notifications')
    this.notificationDetails$ = this.notificationREF.valueChanges()
    
  }

  ionViewDidLoad() {}






}
