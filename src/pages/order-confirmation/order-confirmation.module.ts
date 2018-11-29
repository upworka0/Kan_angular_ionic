import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderConfirmationPage } from './order-confirmation';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    OrderConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(OrderConfirmationPage),
    TranslateModule.forChild()
  ],
  exports: [
    OrderConfirmationPage
  ]
})
export class OrderConfirmationPageModule {}
