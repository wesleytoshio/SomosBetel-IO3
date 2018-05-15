import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HeaderColor } from "@ionic-native/header-color";

import { TabsPage } from '../pages/tabs/tabs';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../pages/login/login';
import firebase from 'firebase';

import { OneSignal } from '@ionic-native/onesignal';
import { AngularFirestore } from 'angularfire2/firestore';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(
    private _db: AngularFirestore,
    private oneSignal: OneSignal,
    public afAuth: AngularFireAuth,
    public platform: Platform, 
    public statusBar: StatusBar, 
    public headerColor: HeaderColor,
    public splashScreen: SplashScreen) {

        
    //If Logged Persistent  
    firebase.auth().onAuthStateChanged((user)=>{
      if (!user) {
        console.log("Não Logado");
        this.rootPage = LoginPage;
      } else {
        const userId = this.afAuth.auth.currentUser.uid
        console.log("autoLogin - " + userId);
        this.rootPage = TabsPage;
      }
    })

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      statusBar.backgroundColorByHexString('#dddddd'); // Tollbar color
      this.headerColor.tint('#eaebed') //Header color task window
      splashScreen.hide();

      _db.firestore.settings({ timestampsInSnapshots: true });
      _db.firestore.enablePersistence(); //offline acess

      //Push Notifications
      this.oneSignal.startInit('736e2984-79e2-4c81-9809-fa992c3b7177', '341235712964');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
      this.oneSignal.handleNotificationReceived().subscribe(() => {
       // do something when notification is received
      });
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
      this.oneSignal.endInit();
    });
    
  }

}
