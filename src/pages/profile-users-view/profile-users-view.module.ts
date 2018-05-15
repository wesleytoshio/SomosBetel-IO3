import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfileUsersViewPage } from './profile-users-view';

@NgModule({
  declarations: [
    ProfileUsersViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ProfileUsersViewPage),
  ],
})
export class ProfileUsersViewPageModule {}
