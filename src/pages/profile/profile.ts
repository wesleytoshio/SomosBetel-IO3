import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, App } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import firebase from 'firebase';
import { ProfileUser } from "../../Models/ProfileUser";
import { ProfileEditPage } from '../profile-edit/profile-edit';
import { birthdateConvertingForAge } from '../../app/utils';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

//cria um novo objeto
profileuser = {} as ProfileUser;

userData: AngularFirestoreDocument<ProfileUser>
userDetails: Observable<ProfileUser>


  constructor(
    private afAuth: AngularFireAuth,
    private database: AngularFirestore, 
    private modal: ModalController,
    public navCtrl: NavController,
    public appCtrl:App, 
    public navParams: NavParams) {


    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    firebase.auth().onAuthStateChanged((user)=>{
      if (!user) {
        console.log("Não Logado");
      } else {
        const userId = this.afAuth.auth.currentUser.uid
        this.userData = this.database.doc(`Profiles/${userId}`)
        this.userDetails = this.userData.valueChanges();
      }
    })

}

ionViewDidLoad() {}

//Open Modal
EditProfileModal(){
  const myModal = this.modal.create(ProfileEditPage);
  myModal.present();
 
 }

 goAdminPage(){
    this.appCtrl.getRootNav().setRoot('AdminPage')
 }

convertBirthDate(date: string) {
  return birthdateConvertingForAge(date); // Age Convert
}
    
}
