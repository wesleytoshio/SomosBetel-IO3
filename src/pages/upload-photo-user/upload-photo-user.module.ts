import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UploadPhotoUserPage } from './upload-photo-user';

@NgModule({
  declarations: [
    UploadPhotoUserPage,
  ],
  imports: [
    IonicPageModule.forChild(UploadPhotoUserPage),
  ],
})
export class UploadPhotoUserPageModule {}
