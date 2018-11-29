import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantDepositsPage } from './merchant-deposits';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MerchantDepositsPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantDepositsPage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantDepositsPage
  ]
})
export class MerchantDepositsPageModule {}
