import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NotificationCreatePage } from './notification-create';

@NgModule({
  declarations: [
    NotificationCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(NotificationCreatePage),
  ],
})
export class NotificationCreatePageModule {}
