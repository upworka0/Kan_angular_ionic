import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ForgetPasswordPage } from './forget-password';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ForgetPasswordPage,
  ],
  imports: [
    IonicPageModule.forChild(ForgetPasswordPage),
    TranslateModule.forChild()
    
  ],
  exports: [
    ForgetPasswordPage
  ]
})
export class ForgetPasswordPageModule {}
