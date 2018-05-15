import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminEventListPage } from './admin-event-list';

@NgModule({
  declarations: [
    AdminEventListPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminEventListPage),
  ],
})
export class AdminEventListPageModule {}
