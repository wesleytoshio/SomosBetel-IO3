import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProfileUser } from '../../Models/ProfileUser';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import firebase from 'firebase'

@IonicPage()
@Component({
  selector: 'page-users-list',
  templateUrl: 'users-list.html',
})
export class UsersListPage {

  //cria objeto
  profileuser = {} as ProfileUser;
  //seleciona o node firebase para mostrar dados
  listusersDataRef: AngularFirestoreCollection<ProfileUser>;
  userslist: Observable<ProfileUser[]>
  

  constructor(
    public navCtrl: NavController,
    private modal: ModalController,
    public navParams: NavParams,
    private afDatabase: AngularFirestore,) {

      const firestore = firebase.firestore();
      const settings = {/* your settings... */ timestampsInSnapshots: true};
      firestore.settings(settings);

      //lista usuários do node selecionado
      this. listusersDataRef = this.afDatabase.collection('Profiles')
      this.userslist = this.listusersDataRef.valueChanges();

  }

  ionViewDidLoad() {}

  selecUser(uid){
    const myModal = this.modal.create('ProfileUsersViewPage', {id: uid});
    myModal.present();

  }

}
