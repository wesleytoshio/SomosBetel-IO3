import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Event } from '../../Models/events';
import firebase from 'firebase';


@IonicPage()
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html',
})
export class EventEditPage {

  event= {} as Event;
  eventId: any;

  eventData: AngularFirestoreDocument<Event>
  eventDetails: Observable<Event>;
  eventSubscription: Subscription;

  constructor(
    private database: AngularFirestore,
    private alertCtrl: AlertController,
    public navCtrl: NavController, 
    public appCtrl: App, 
    public navParams: NavParams) {

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);
      
      const eventId = navParams.get('eventId')
      console.log(eventId)

      this.eventData = this.database.doc(`Eventos/${eventId}`);
      this.eventDetails = this.eventData.valueChanges();
      //sobreescreve o resultado nos campos do item.
      this.eventSubscription = this.eventData.valueChanges().subscribe(event => this.event = event);
  


  }

ionViewDidLoad() { }

// atualiza node no firebase com novos dados
SaveEvent(profileuser: Event){
  this.eventData.update(profileuser);          //Faz o Update dos dados pessoais
  this.alert('Evento Atualizado com Sucesso!');      //Alerta de Sucesso
}

alert(message: string) {
  this.alertCtrl.create({
    title: 'Pronto!',
    subTitle: message,
    buttons: ['OK']
  }).present();
   
}

photoUpload(eventId){
  console.log(eventId)
  let nav = this.appCtrl.getRootNav()
  nav.push('UploadPage', {id: eventId})
}

}
