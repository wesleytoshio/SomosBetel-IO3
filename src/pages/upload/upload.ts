import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, LoadingController, App, Loading } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import firebase from "firebase";
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

declare var window: any;

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {

  loading: Loading;
  name: string;
  myphotoURL: string;
  public storageREF: any;

  //realtime get image*/
  eventModel = {} as Event;
  docREF: AngularFirestoreDocument<Event>
  imgDoc$: Observable<Event>



  constructor(
    public navCtrl: NavController,
    public appCtrl: App, 
    public navParams: NavParams,
    public platform: Platform,
    private toastCtrl: ToastController,
    private database: AngularFirestore,
    private loadingCtrl: LoadingController,
    private camera: Camera
    ) {

    const docID = this.navParams.get('id')//Captura ID do documento se ele foi passado pela pagina anterio
    console.log(docID)
    //Firebase Storage Referencia
    this.storageREF = firebase.storage().ref();

    //realtime get image*/
    this.docREF = this.database.doc(`Eventos/${docID}`)
    this.imgDoc$ = this.docREF.valueChanges()
     
  }

  ionViewDidLoad() {}

  url; //variavel global que retorna a url
  imageURL: string; //variavel global que receberá na proxima função a URL da imagem como valor
  photoURL;

// Função que selecionar da galeria
getMedia(): Promise<any> {

return this.camera.getPicture({
    
    //******Camera Options*****/////
    allowEdit : true,
    targetWidth: 800,
    targetHeight: 430,
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

//Função UPLOAD
upload(blob:Blob){
    const docID = this.navParams.get('id') //Captura ID do documento se ele foi passado pela pagina anterior
    const pictures = this.storageREF.child(`Eventos-imagens/${docID}/img.jpg` ) //Caminho para Salvar Imagen no storage
    pictures.put(blob)
    .then(url =>{
       //Captura Url da imagem  
       this.imageURL = url.downloadURL
       //console.log(this.imageURL)
       //messages toast and loading end
      if(this.imageURL){
        this.dismissLoading()// close loading
        this.savephotoURL(this.imageURL) // ****chamada para função Salvar Foto
      }else{
       this.presentToastError()
    }                      
})} 
//CROP + UPLOAD FOR FIREBASE STORAGE


// GET AND SAVE URL IMAGE IN DATABASE FIRESTORE

savephotoURL(imageURL): void{
    //console.log(imageURL)
    this.photoURL = this.imageURL //Adiciona o valor da variavel global a uma nova variavel (*opcional)
    const docID = this.navParams.get('id') //Get Id da vaga criada para criar caminho
    this.database.doc(`Eventos/${docID}/`).update({ photoURL: imageURL }) //salva a url no documento firestore
    this.presentToastSucess()   
}

deleteImage(){
  
    const docID = this.navParams.get('id') //Get Id da vaga criada
    this.database.doc(`Eventos/${docID}/`).update({ photoURL: firebase.firestore.FieldValue.delete() })
    var fileDelet = this.storageREF.child(`Eventos-imagens/${docID}/img.jpg` );
    fileDelet.delete().then(function() {
      console.log('File deleted successfully')
      this.presentToastDeleteImage()
    }).catch(function(error) {
      console.log(error)
    });
}

finish(){
    this.appCtrl.getRootNav().setRoot('AdminPage'); //direciona para AdminPage      
}



//Toast Controllers
presentToastSucess() {
let toast = this.toastCtrl.create({
  message: ('Imagem Enviada com Sucesso!' ),
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
  message: ('Desculpe, houve um erro ao enviar a Foto tente novamente!' ),
  duration: 3000,
  position: 'bottom'
});
toast.onDidDismiss(() => {
});
toast.present();
}

presentToastDeleteImage() {
  let toast = this.toastCtrl.create({
    message: ('imagem Removida com sucesso!' ),
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
          content: 'Carregando Imagem...'
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
