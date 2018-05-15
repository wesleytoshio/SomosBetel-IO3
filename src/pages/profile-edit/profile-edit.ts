import { Component } from '@angular/core';
import { NavParams, ViewController, AlertController, NavController, App } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import { AngularFirestore, AngularFirestoreDocument } from "angularfire2/firestore";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { ProfileUser } from "../../Models/ProfileUser";
import { Subscription } from 'rxjs/Subscription';
import { UploadPhotoUserPage } from '../upload-photo-user/upload-photo-user';


//@IonicPage()
@Component({
  selector: 'page-profile-edit',
  templateUrl: 'profile-edit.html',
})
export class ProfileEditPage {

  profileuser = {} as ProfileUser;
  userData: AngularFirestoreDocument<ProfileUser>
  userDetails: Observable<ProfileUser>;
  userSubscription: Subscription;

  constructor(
    private afAuth: AngularFireAuth,
    private database: AngularFirestore,
    private view: ViewController,
    private alertCtrl: AlertController,
    public navCtrl: NavController, 
    public appCtrl: App, 
    public navParams: NavParams) {

    
    this.afAuth.authState.take(1).subscribe(user => {
       this.userData = this.database.doc(`Profiles/${user.uid}`);
       this.userDetails = this.userData.valueChanges();
       //sobreescreve o resultado nos campos do item.
       this.userSubscription = this.userData.valueChanges().subscribe(profileuser => this.profileuser = profileuser);
    })

}

  ionViewDidLoad() {}

  alert(message: string) {
    this.alertCtrl.create({
      title: 'Perfil salvo!',
      subTitle: message,
      buttons: ['OK']
    }).present();
     
  }

// atualiza node no firebase com novos dados
Saveprofile(profileuser: ProfileUser){
  this.userData.update(profileuser);          //Faz o Update dos dados pessoais
  this.alert('Atualizado com Sucesso!');      //Alerta de Sucesso
}

photoUpload(){
  let nav = this.appCtrl.getRootNav()
  this.view.dismiss();
  nav.push(UploadPhotoUserPage)
}

//Close Modal Function button
closeModal(){
  this.view.dismiss();
}

ionViewWillLeave(){
  this.userSubscription.unsubscribe(); //Cancela a inscrição do observável ao sair da página
}


}
