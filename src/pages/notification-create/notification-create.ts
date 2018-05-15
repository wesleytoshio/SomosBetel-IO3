import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import firebase from 'firebase'
import { AngularFirestore } from "angularfire2/firestore";
import 'rxjs/add/operator/map';
import {Validators, FormBuilder } from '@angular/forms';
import { dateDataSortValue } from 'ionic-angular/util/datetime-util';


declare var window: any;

@IonicPage()
@Component({
  selector: 'page-notification-create',
  templateUrl: 'notification-create.html',
})
export class NotificationCreatePage {

  NotificationForm: any = {};

  constructor(
    public appCtrl: App,
    public formBuilder: FormBuilder,
    private afDatabase: AngularFirestore,
    public navCtrl: NavController, 
    public navParams: NavParams) {

    const firestore = firebase.firestore();
    const settings = {/* your settings... */ timestampsInSnapshots: true};
    firestore.settings(settings);

    //validators form         
    this.NotificationForm = this.formBuilder.group({
      title: ['', Validators.required],
      bodyMessage: ['', Validators.required],
             
    });  

  }

ionViewDidLoad() { }


saveAndSendNotification(NotificationForm){
     const createDate = firebase.firestore.FieldValue.serverTimestamp(); //timestamp
     const myDate: String = new Date().toISOString(); //set current date

     //save Event Details e in firestore Doc
     this.afDatabase.collection(`Notifications`).add({
       createdAt: createDate,
       dateSending: myDate,
       title: this.NotificationForm.value.title,
       bodyMessage: this.NotificationForm.value.bodyMessage,
       })
       .then((response) => {
       //console.log(response.id),
       //const docID = response.id
       this.SendPushNotification(NotificationForm) //**envia push notification
       this.navCtrl.pop()
       });
}



//Enviar Aviso
SendPushNotification(NotificationForm){
  window.plugins.OneSignal.getIds(ids => {
    var message = { 
        contents: {
          title: this.NotificationForm.value.title,
          en: this.NotificationForm.value.bodyMessage,
        },
        include_player_ids: [ids.userId]
    };
    window.plugins.OneSignal.postNotification(
      message,
      successResponse => {
        console.log(successResponse)
        // Sucesso
      },
      erro => {
        // Erro
      }
    );
  });
}


//**Outros Exemplos de envio de notificação PUSH */


  // for iOS only and set kOSSettingsKeyAutoPrompt to false in init call
  registerForPushNotifications() {
    window["plugins"].OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
      console.log("User accepted notifications: " + accepted);
  });
  }

  // add tags to users
  sendTags() {
    window["plugins"].OneSignal.sendTags({key: "value", another_key: "another value"});
    console.log("tags sent");
  }


  // get tags and upate one
  getAndUpdateTag() {
    window["plugins"].OneSignal.getTags(function(tags) {
      console.log('Tags Received: ' + JSON.stringify(tags));
      window["plugins"].OneSignal.sendTag("another_key", "another key's value changed");
  });
  }

  // get the OneSignal userId aka playerId
  getOneSignalPlayerId() {
    window["plugins"].OneSignal.getPermissionSubscriptionState(function(status) {
      status.permissionStatus.hasPrompted;
      status.permissionStatus.status;

      status.subscriptionStatus.subscribed;
      status.subscriptionStatus.userSubscriptionSetting;
      status.subscriptionStatus.pushToken;

      //var playerID = status.subscriptionStatus.userId;
      console.log(status.subscriptionStatus.userId);
  });
  }

  // prompt user to accept sending location data
  promptLocation() {
    window["plugins"].OneSignal.promptLocation();
    console.log('location prompted');
  }

  // send a notification with an image
  sendNotificationwithImage() {
    window["plugins"].OneSignal.getIds(function(ids) {
      var notificationObj = { contents: {en: "message with image"},
                        include_player_ids: [ids.userId],
                        big_picture: "https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg",
                        
                        ios_attachments: {id1: "https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg"}
                        };

      window["plugins"].OneSignal.postNotification(notificationObj,
        function(successResponse) {
            console.log("Notification Post Success:", successResponse);
        },
        function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
      );
  });
  }

  // send Notification Action Buttons and Deep Link
  sendNotificationWithActionButtonsAndDeepLink() {
    window["plugins"].OneSignal.getIds(function(ids) {
      var notificationObj = { contents: {en: "Message with Action Buttons and Deep link"},
                        include_player_ids: [ids.userId],
                        data: {data_key: "data_value", openURL: "https://imgur.com/"},

                        buttons: [{"id": "id1", "text": "Deep Link with URL", "icon": "ic_menu_share"}, {"id": "id2", "text": "just button2", "icon": "ic_menu_send"}]
                        };

      window["plugins"].OneSignal.postNotification(notificationObj,
        function(successResponse) {
            console.log("Notification Post Success:", successResponse);
        },
        function (failedResponse) {
            console.log("Notification Post Failed: ", failedResponse);
            alert("Notification Post Failed:\n" + JSON.stringify(failedResponse));
        }
      );
  });
  }



}
