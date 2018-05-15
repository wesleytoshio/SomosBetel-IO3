import { Component } from '@angular/core';
import { ViewController, NavController, App } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';


@Component({
  selector: 'popover',
  templateUrl: 'popover.html'
})
export class PopoverComponent {

  itensMenu: any;
  text: string;

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public appCtrl: App,
    public afAuth: AngularFireAuth,
  ) {
  }


//Sair
logout(){
  this.afAuth.auth.signOut().then(() => {
     //console.log('Desconectado com sucesso')
     this.viewCtrl.dismiss()
     this.appCtrl.getRootNav().setRoot(LoginPage); //direciona para loginPage
});}

}
