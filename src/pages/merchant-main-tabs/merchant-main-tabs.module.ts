import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantMainTabsPage } from './merchant-main-tabs';

@NgModule({
  declarations: [
    MerchantMainTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantMainTabsPage),
  ],
  exports: [
    MerchantMainTabsPage
  ]
})
export class MerchantMainTabsPageModule {}
