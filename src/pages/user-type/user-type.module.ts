import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserTypePage } from './user-type';

@NgModule({
  declarations: [
    UserTypePage,
  ],
  imports: [
    IonicPageModule.forChild(UserTypePage),
  ],
  exports: [
    UserTypePage
  ]
})
export class UserTypePageModule {}