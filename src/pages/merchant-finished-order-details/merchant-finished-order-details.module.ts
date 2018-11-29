import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantFinishedOrderDetailsPage } from './merchant-finished-order-details';
import { TranslateModule } from '@ngx-translate/core';
import { Ionic2RatingModule } from 'ionic2-rating';
@NgModule({
  declarations: [
    MerchantFinishedOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantFinishedOrderDetailsPage),
    TranslateModule.forChild(),
    Ionic2RatingModule
  ],
  exports: [
    MerchantFinishedOrderDetailsPage
  ]
})
export class MerchantFinishedOrderDetailsPageModule {}
