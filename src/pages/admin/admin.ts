import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, App, ViewController } from 'ionic-angular';
import { PopoverComponent } from '../../components/popover/popover';
import { AngularFireAuth } from 'angularfire2/auth';
import { TabsPage } from '../tabs/tabs';

@IonicPage()
@Component({
  selector: 'page-admin',
  templateUrl: 'admin.html',
})
export class AdminPage {

  constructor(
    public appCtrl: App,
    public navCtrl: NavController,
    public viewCtrl: ViewController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public afAuth: AngularFireAuth,
    
  ) {
  }

  ionViewDidLoad() {
   //console.log('ionViewDidLoad AdminPage');
  }

presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(PopoverComponent);
    popover.present({
      ev: myEvent,
    });
    popover.onDidDismiss(popoverData=>{
     // console.log(popoverData)
    })
  }

  goEventList(){
    let nav = this.appCtrl.getRootNav()
    nav.push('AdminEventListPage')
  }
  
  goEventCreate(){
    let nav = this.appCtrl.getRootNav()
    nav.push('EventCreatePage')
  }

  goNotificationCreate(){
    let nav = this.appCtrl.getRootNav()
    nav.push('NotificationCreatePage')
  }
  goNotificationEdit(){
    let nav = this.appCtrl.getRootNav()
    nav.push('AdminNotificationListPage')
  }

  //Sair do painel admin
  logout(){
    this.appCtrl.getRootNav().setRoot(TabsPage); //direciona para loginPage
 }

}
