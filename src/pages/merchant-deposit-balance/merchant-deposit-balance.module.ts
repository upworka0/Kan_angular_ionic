import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantDepositBalancePage } from './merchant-deposit-balance';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MerchantDepositBalancePage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantDepositBalancePage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantDepositBalancePage
  ]
})
export class MerchantDepositBalancePageModule {}
