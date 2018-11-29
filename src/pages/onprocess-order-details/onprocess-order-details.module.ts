import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OnprocessOrderDetailsPage } from './onprocess-order-details';

@NgModule({
  declarations: [
    OnprocessOrderDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(OnprocessOrderDetailsPage),
  ],
  exports: [
    OnprocessOrderDetailsPage
  ]
})
export class OnprocessOrderDetailsPageModule {}
