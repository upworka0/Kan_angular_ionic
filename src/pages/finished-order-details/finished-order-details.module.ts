import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FinishedOrderDetailsPage } from './finished-order-details';
import { TranslateModule } from '@ngx-translate/core';
import { Ionic2RatingModule } from 'ionic2-rating';

@NgModule({
  declarations: [
    FinishedOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FinishedOrderDetailsPage),
    Ionic2RatingModule,
    TranslateModule.forChild()
  ],
  exports: [
    FinishedOrderDetailsPage
  ]
})
export class FinishedOrderDetailsPageModule {}
