import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, App } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from "firebase";


@IonicPage()
@Component({
  selector: 'page-admin-event-list',
  templateUrl: 'admin-event-list.html',
})
export class AdminEventListPage {

  public storageREF: any;

  eventModel = {} as Event;
  eventREF: AngularFirestoreCollection<Event>;
  eventDetails: Observable<Event[]>

  constructor(
    public navCtrl: NavController,
    public appCtrl: App, 
    public navParams: NavParams,
    private afs: AngularFirestore,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,) {

      const firestore = firebase.firestore();
      const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);

      //Firebase Storage Reference
      this.storageREF = firebase.storage().ref();

      afs.firestore.settings({ timestampsInSnapshots: true });
      
      this.eventREF = this.afs.collection('Eventos')
      //Captura Parametros do perfil
      this.eventDetails = this.eventREF.snapshotChanges().map(actions => {
        return actions.map(action => {
          const id = action.payload.doc.id;
          //console.log(id)
          const data = action.payload.doc.data() as Event;
          return { id, ...data };
        });
      });
  }


  ionViewDidLoad() {
    //console.log('ionViewDidLoad AdminEventListPage');
  }

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
          text: 'Ver Evento',
          role: 'Edit',
          handler: () => {
            this.EventView(docId)
          }
        },{
          text: 'Editar Evento',
          handler: () => {
            this.EditEvent(docId)
          }
        },{
          text: 'Excluir Evento',
          handler: () => {
            this.showConfirm(docId) //alert function
          }
        },{
          text: 'sair',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
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
     this.afs.doc(`Eventos/${docId}`).delete().then(function() {
         console.log("Document successfully deleted!");
     }).catch(function(error) {
         console.error("Error removing document: ", error);
     });
     //delete image event in storage
     var fileDelet = this.storageREF.child(`Eventos-imagens/${docId}/img.jpg` );
      fileDelet.delete().then(function() {
        console.log('File deleted successfully')
        this.presentToastDeleteImage()
      }).catch(function(error) {
        console.log(error)
      });
  }

  //Edit Event
  EditEvent(docId){
     let nav = this.appCtrl.getRootNav()
     nav.push('EventEditPage',{eventId: docId})
  }

  //Event View
  EventView(docId){
    let nav = this.appCtrl.getRootNav()
    nav.push('EventViewPage',{eventId: docId})
  }




}
