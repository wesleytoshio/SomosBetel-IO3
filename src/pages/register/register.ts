import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { ProfileUser } from '../../Models/ProfileUser';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  profileuser = {} as ProfileUser;

  @ViewChild('username') user;
	@ViewChild('password') password;

  constructor(
    private alertCtrl: AlertController, 
    private fire: AngularFireAuth, 
    private afDatabase: AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {}

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Parabéns!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

  registerUser() {
    this.fire.auth.createUserWithEmailAndPassword(this.user.value, this.password.value)
    .then(data => {
      console.log('got data ', data);
      const userId = data.uid
      this.afDatabase.doc(`Profiles/${userId}`).set({
           email: this.fire.auth.currentUser.email,
           uid: userId,
           isAdmin: false,
      }).then(response=>{
          this.navCtrl.setRoot( 'ProfileCreatePage' );
          this.alert('Conta Criada Com sucesso! Agora é só criar seu perfil.');
      })
    })
    .catch(error => {
      console.log('got an error ', error);
      this.alert(error.message);
    });
  	console.log('Would register user with ', this.user.value, this.password.value);
  }
}
