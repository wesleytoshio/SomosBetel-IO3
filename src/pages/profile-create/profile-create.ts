import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import firebase from 'firebase'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'; 
import { ProfileUser } from '../../Models/ProfileUser';
import { UploadPhotoUserPage } from '../upload-photo-user/upload-photo-user';
import { Validators, FormBuilder } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-profile-create',
  templateUrl: 'profile-create.html',
})
export class ProfileCreatePage {


  profileuser = {} as ProfileUser;
  registerProfile: any = {};
  email:string;

  constructor(
    public navCtrl: NavController, 
    public appCtrl: App,
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private afDatabase: AngularFirestore,
    public formBuilder: FormBuilder,) {

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

  //validators form         
  this.registerProfile = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      birthDate: ['', Validators.required], 
      whatsapp: ['', Validators.required],     
      city:['', Validators.required],
      state:['', Validators.required],
      memberSince:['', Validators.required], 
      functionType:['', Validators.nullValidator]  
    });   
  }

ionViewDidLoad() {}

//**Função criar perfil após clicar no botão
createProfile() {
      const accountDate = firebase.firestore.FieldValue.serverTimestamp(); //Date acount Created
      this.email = this.afAuth.auth.currentUser.email
  
      this.afAuth.authState.take(1).subscribe(auth =>{
      this.afDatabase.doc(`Profiles/${auth.uid}`).update({
                createdAt: accountDate,
                birthDate: this.registerProfile.value.birthDate,
                firstname: this.registerProfile.value.firstname,
                lastname: this.registerProfile.value.lastname,
                city: this.registerProfile.value.city,
                state: this.registerProfile.value.state,
                whatsapp: this.registerProfile.value.whatsapp, 
                memberSince: this.registerProfile.value.memberSince,
                functionType: this.registerProfile.value.functionType,
       }).then(() => 
                this.navCtrl.setRoot(UploadPhotoUserPage));
    })
  }

}
