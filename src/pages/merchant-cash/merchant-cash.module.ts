import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantCashPage } from './merchant-cash';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MerchantCashPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantCashPage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantCashPage
  ]
})
export class MerchantCashPageModule {}
