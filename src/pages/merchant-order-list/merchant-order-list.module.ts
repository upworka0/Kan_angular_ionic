import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantOrderListPage } from './merchant-order-list';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MerchantOrderListPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantOrderListPage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantOrderListPage
  ]
})
export class MerchantOrderListPageModule {}
