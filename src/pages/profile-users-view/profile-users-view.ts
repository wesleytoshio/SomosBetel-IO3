import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { ProfileUser } from '../../Models/ProfileUser';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { birthdateConvertingForAge } from '../../app/utils';

@IonicPage()
@Component({
  selector: 'page-profile-users-view',
  templateUrl: 'profile-users-view.html',
})
export class ProfileUsersViewPage {

  //cria um novo objeto
profileuser = {} as ProfileUser;
userData: AngularFirestoreDocument<ProfileUser>
userDetails: Observable<ProfileUser>

constructor(
    public navCtrl: NavController,
    private viewCtrl: ViewController, 
    public navParams: NavParams,
    private database: AngularFirestore, ) {

      const userId = navParams.get('id')
      this.userData = this.database.doc(`Profiles/${userId}`)
      this.userDetails = this.userData.valueChanges();
}

ionViewDidLoad() {}

//Close Modal Function button
closeModal(){
  this.viewCtrl.dismiss();
}

convertBirthDate(date: string) {
  return birthdateConvertingForAge(date); //Idade Corretamente
}

}
