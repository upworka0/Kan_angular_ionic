import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantDetailsPage } from './merchant-details';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    MerchantDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantDetailsPage),
    TranslateModule.forChild()
  ],
  exports: [
    MerchantDetailsPage
  ]
})
export class MerchantDetailsPageModule {}
