import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MerchantAccountPage } from './merchant-account';
import { TranslateModule } from '@ngx-translate/core';
import {AccordionModule} from "ngx-accordion";
@NgModule({
  declarations: [
    MerchantAccountPage,
  ],
  imports: [
    IonicPageModule.forChild(MerchantAccountPage),
    TranslateModule.forChild(),
    AccordionModule
  ],
  exports: [
    MerchantAccountPage
  ]
})
export class MerchantAccountPageModule {}
