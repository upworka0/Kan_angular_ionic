import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantHomePage } from './merchant-home';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    MerchantHomePage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantHomePage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantHomePage
  ]
})
export class MerchantHomePageModule {}
