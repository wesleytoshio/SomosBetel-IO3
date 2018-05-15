import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, LoadingController, Loading } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { RegisterPage } from '../register/register';
import { TabsPage } from '../tabs/tabs';
import firebase from 'firebase'
import { AngularFirestore } from 'angularfire2/firestore';



//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: Loading;

  @ViewChild('username') user;
	@ViewChild('password') password;

  constructor(
    private alertCtrl: AlertController, 
    private toastCtrl: ToastController,
    private fire:AngularFireAuth,
    public navCtrl: NavController, 
    public navParams: NavParams,
    private db: AngularFirestore,
    private loadingCtrl: LoadingController,
  ) {
   db.firestore.settings({ timestampsInSnapshots: true });
  }

  ionViewDidLoad() {}

  signInUser() {
    this.fire.auth.signInWithEmailAndPassword(this.user.value, this.password.value)
    .then( data => {
      console.log('got some data', this.fire.auth.currentUser);
      this.presentToastSucess()
      //this.alert('Success! You\'re logged in');
      this.navCtrl.setRoot( TabsPage );
      // user is logged in
    })
    .catch( error => {
      console.log('got an error', error);
      this.alert(error.message);
    })
  //	console.log('Would sign in with ', this.user.value, this.password.value);
  }

    
  register() {
  	this.navCtrl.push(RegisterPage);
  }
  //Errors login
  alert(message: string) {
    this.alertCtrl.create({
      title: 'Info!',
      subTitle: message,
      buttons: ['OK']
    }).present();
  }

//Toast Message login sucess
presentToastSucess() {
  let toast = this.toastCtrl.create({
    message: ('Seja Bem-Vindo!' ),
    duration: 2000,
    position: 'bottom'
  })
  toast.onDidDismiss(() => {
  });
  toast.present();
  }

  
////////////////Reset Password
showPromptPassRecover(message: string) {
    let prompt = this.alertCtrl.create({
      title: 'Digite Seu Email',
      message: "Uma nova senha ser enviada para seu email.",
      inputs: [
        {
          name: 'recoverEmail',
          placeholder: 'youremail@example.com'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: 'Enviar',
          handler: data => {
            
            let loading = this.loadingCtrl.create({
              dismissOnPageChange: true,
              content: 'Enviando email para redefinição de senha...',
            })

            this.fire.auth.sendPasswordResetEmail(data.recoverEmail).then(()=>{
              loading.dismiss().then((result)=>{
                console.log(result)
                let alert = this.alertCtrl.create({
                  title:'Sucesso',
                   message: 'Enviamos um link de redefinição em seu email.',
                  buttons:['ok']
                });
                alert.present();
                
              })
            }).catch(e=>{
                console.log(e)
                let alert = this.alertCtrl.create({
                  title:'Ocorreu um Erro',
                  message: e.message,
                  buttons:['ok']
                });
                alert.present();
            })
          }
        }
      ]
    });
    prompt.present();
  }
  

}
