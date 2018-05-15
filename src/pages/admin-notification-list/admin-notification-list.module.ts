import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminNotificationListPage } from './admin-notification-list';

@NgModule({
  declarations: [
    AdminNotificationListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminNotificationListPage),
  ],
})
export class AdminNotificationListPageModule {}
