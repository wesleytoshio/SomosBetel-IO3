import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import firebase from 'firebase'
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { Notification } from '../../Models/Notification';


@IonicPage()
@Component({
  selector: 'page-admin-notification-list',
  templateUrl: 'admin-notification-list.html',
})
export class AdminNotificationListPage {

  notification = {} as Notification;
  notificationREF: AngularFirestoreCollection<Event>;
  notificationDetails$: Observable<Event[]>

  constructor(
    public navParams: NavParams,
    private afs: AngularFirestore,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public navCtrl: NavController) {

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    this.notificationREF = this.afs.collection('Notifications')
    //Captura Parametros da notificação
    this.notificationDetails$ = this.notificationREF.snapshotChanges().map(actions => {
      return actions.map(action => {
        const id = action.payload.doc.id;
        //console.log(id)
        const data = action.payload.doc.data() as Event;
        return { id, ...data };
      });
    });
  
  }

ionViewDidLoad() {}

openOptions(docId){
  console.log(docId)
  this.presentOptionsActionSheet(docId)
}


//Show Options
presentOptionsActionSheet(docId) {
  let actionSheet = this.actionSheetCtrl.create({
    title: 'O que deseja Fazer? ',
    buttons: [
     {
        text: 'Excluir Notificação',
        handler: () => {
          this.showConfirm(docId) //alert function
        }
      },{
        text: 'sair',
        role: 'cancel',
        handler: () => {
          //console.log('Cancel clicked');
        }
      }
    ]
  });
  actionSheet.present();
}

//Confirm Delet Event ALERT
 showConfirm(docId) {
  let confirm = this.alertCtrl.create({
    title: 'Confirmar',
    message: 'Você tem certeza que deseja excluir este Evento?',
    buttons: [
      {
        text: 'Não',
        handler: () => {
          console.log('Cancelado');
        }
      },
      {
        text: 'Sim',
        handler: () => {
          this.DeleteEvent(docId) // **Delete Function
        }
      }
    ]
  });
  confirm.present();
}


 //Deleta evento
 DeleteEvent(docId){
  console.log(docId)
  this.afs.doc(`Notifications/${docId}`).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
}

}
