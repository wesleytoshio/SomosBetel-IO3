import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { AngularFireModule } from "angularfire2";
import { AngularFirestoreModule } from "angularfire2/firestore";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
//import { RegisterPage } from '../pages/register/register';
//import { LoginPage } from '../pages/login/login';
//import { ProfileEditPage } from '../pages/profile-edit/profile-edit';
//import { UploadPhotoUserPage } from '../pages/upload-photo-user/upload-photo-user';
import { PopoverComponent } from '../components/popover/popover';
import { File } from '@ionic-native/file';
import { OneSignal } from '@ionic-native/onesignal';
import { HeaderColor } from '@ionic-native/header-color'
import { LoginPageModule } from '../pages/login/login.module';
import { RegisterPageModule } from '../pages/register/register.module';
import { UploadPhotoUserPageModule } from '../pages/upload-photo-user/upload-photo-user.module';
import { ProfileEditPageModule } from '../pages/profile-edit/profile-edit.module';



//FIREBASE CONFIG
const firebaseAuth = {
    apiKey: "AIzaSyAF2gZV3MKCczQPU0oUMBMPwcGKeVfCo6s",
    authDomain: "betel-aplicativo.firebaseapp.com",
    databaseURL: "https://betel-aplicativo.firebaseio.com",
    projectId: "betel-aplicativo",
    storageBucket: "betel-aplicativo.appspot.com",
    messagingSenderId: "341235712964"
};


@NgModule({
  declarations: [
    PopoverComponent,
    MyApp,
    HomePage,
    TabsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseAuth),
    AngularFirestoreModule, 
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    LoginPageModule,
    RegisterPageModule,
    UploadPhotoUserPageModule,
    ProfileEditPageModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    PopoverComponent,
    MyApp,
    HomePage,
    TabsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HeaderColor,
    Camera,
    File,
    OneSignal
  ]
})
export class AppModule {}
