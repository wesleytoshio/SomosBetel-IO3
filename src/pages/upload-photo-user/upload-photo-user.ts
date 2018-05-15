import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, Platform, App, ViewController } from 'ionic-angular';
import firebase from "firebase";
import { Observable } from 'rxjs/Observable';
import { Camera } from '@ionic-native/camera';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { ProfileUser } from '../../Models/ProfileUser';
import { TabsPage } from '../tabs/tabs';


declare var window: any;

//@IonicPage()
@Component({
  selector: 'page-upload-photo-user',
  templateUrl: 'upload-photo-user.html',
})
export class UploadPhotoUserPage {

  loading;
  name: string;
  myphotoURL: string;
  public storageREF: any;

  //realtime get photo*/
  profileUser = {} as ProfileUser;
  userREF: AngularFirestoreDocument<ProfileUser>
  photoUser$: Observable<ProfileUser>

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    public appCtrl: App, 
    public navParams: NavParams,
    private afAuth: AngularFireAuth,
    private database: AngularFirestore,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    private toastCtrl: ToastController,
    public camera: Camera,
  ) {
     //Firebase Storage Referencia
     this.storageREF = firebase.storage().ref();
     //realtime get image*/
     const userId = this.afAuth.auth.currentUser.uid 
     //console.log(userId)
     this.userREF = this.database.doc(`Profiles/${userId}`)
     this.photoUser$ = this.userREF.valueChanges()

  }

ionViewDidLoad() {}

url; //variavel global que retorna a url
imageURL: string; //variavel global que receberá na proxima função a URL da imagem como valor
photoURL;

// fazer foto
takePhoto(): Promise<any> {
    return this.camera.getPicture({
      //Camera Options
      allowEdit : true,
      targetWidth: 400,
      targetHeight: 400,
      quality: 100,

  }).then((path) => {
    path; // retorna o caminho da imagem
    window.resolveLocalFileSystemURL(path, FE=>{
      FE.file(file=>{
         const FR=new FileReader()
         FR.onloadend = ((res: any)=>{
           let AF=res.target.result
           let blob=new Blob([new Uint8Array(AF)], {type: 'image/jpg'}); 
           this.upload(blob)   //chamada para a função Upload que define o caminho no storage e pega a URL          
         });
         FR.readAsArrayBuffer(file);
         this.loading.present();// loading ionic start
         }) }) })
         .catch(error=>{
           console.log(error)
           //alert(error)
   })
   } 

// Função que selecionar da galeria
getMedia(): Promise<any> {
  return this.camera.getPicture({
      
      //******Camera Options*****/////
      allowEdit : true,
      targetWidth: 800,
      targetHeight: 800,
      quality:100,
      sourceType : 0
  
  }).then((path) => {
     path; // retorna o caminho da imagem
     window.resolveLocalFileSystemURL(path, FE=>{
      FE.file(file=>{
        const FR=new FileReader()
        FR.onloadend = ((res: any)=>{
          let AF=res.target.result
          let blob=new Blob([new Uint8Array(AF)], {type: 'image/jpg'}); 
          this.upload(blob)   //chamada para a função UPLOAD que define o caminho no storage e pega a URL          
        });
        FR.readAsArrayBuffer(file);
        this.showLoading();// loading ionic start
        }) }) })
        .catch(error =>{
        console.log(error)
        //alert(error)
     })
  }
upload(blob:Blob){
     const userId = this.afAuth.auth.currentUser.uid  // Id do usuario para criar o caminho abaixo
     const pictures = this.storageREF.child(`Profiles/${userId}/img.jpg` )
     pictures.put(blob)
     .then(url =>{
        //Captura Url da imagem  
        this.imageURL = url.downloadURL
        //console.log(this.imageURL)
        //messages toast and loading end
        if(this.imageURL){
          this.loading.dismiss() // close loading
          this.savephotoURL(this.imageURL)
        }else{
          this.presentToastError()
        }                     
})}
       
/////////////////////////////////////////////CROP + UPLOAD FOR FIREBASE STORAGE//////////////////////////


////////////////////////// GET AND SAVE URL IMAGE IN DATABASE FIRESTORE//////////////////////

savephotoURL(imageURL): void{
  this.photoURL = this.imageURL //nova variavel com link
  const userId = this.afAuth.auth.currentUser.uid  //Get Id da vaga criada para criar caminho
  this.database.doc(`Profiles/${userId}/`).update({ photoURL: imageURL }) //salva a url
  this.presentToastSucess()  
}

deleteImage(){
  
   const userId = this.afAuth.auth.currentUser.uid //ID DOC and USER
   this.database.doc(`Profiles/${userId}/`).update({ photoURL: firebase.firestore.FieldValue.delete() })
   var fileDelet = this.storageREF.child(`Profiles/${userId}/img.jpg` );
   fileDelet.delete().then(function() {
    // console.log('File deleted successfully')
     this.presentToastDeleteImage()
   }).catch(function(error) {
     console.log(error)
   });
}

finish(){
  this.navCtrl.setRoot(TabsPage); //direciona para Home Tab Page     
}



//Toast Controllers
presentToastSucess() {
let toast = this.toastCtrl.create({
  message: ('Foto Enviada com Sucesso!' ),
  duration: 5000,
  position: 'bottom'
  })
  toast.onDidDismiss(() => {
    const docID = this.navParams.get('id') //Get Id da vaga criada
    console.log(docID)
  });
  toast.present();
}
  
presentToastError() {
let toast = this.toastCtrl.create({
  message: ('Desculpe, houve um erro ao enviar sua Foto tente novamente!' ),
  duration: 3000,
  position: 'bottom'
  });
  toast.onDidDismiss(() => {
  });
  toast.present();
}
  
presentToastDeleteImage() {
  let toast = this.toastCtrl.create({
    message: ('Foto excluída com sucesso!' ),
    duration: 3000,
    position: 'bottom'
  });
  toast.onDidDismiss(() => {
  });
  toast.present();
  }

//loading controllers
showLoading() {
  if(!this.loading){
    this.loading = this.loadingCtrl.create({
        content: 'Enviando sua Foto...'
    });
    this.loading.present();
  }
}

dismissLoading(){
  if(this.loading){
      this.loading.dismiss();
      this.loading = null;
  }
}


}
