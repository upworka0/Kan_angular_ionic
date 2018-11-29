import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RateMerchantPage } from './rate-merchant';
import { TranslateModule } from '@ngx-translate/core';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    RateMerchantPage,
  ],
  imports: [
    IonicPageModule.forChild(RateMerchantPage),
    Ionic2RatingModule,
    TranslateModule.forChild()
  ],
  exports: [
    RateMerchantPage
  ]
})
export class RateMerchantPageModule {}
