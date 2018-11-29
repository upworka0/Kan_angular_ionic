import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantLoginPage } from './merchant-login';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MerchantLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantLoginPage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantLoginPage
  ]
})
export class MerchantLoginPageModule {}
