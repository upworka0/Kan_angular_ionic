import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AccountPage } from './account';
import { TranslateModule } from '@ngx-translate/core';
import {AccordionModule} from "ngx-accordion";
@NgModule({
  declarations: [
    AccountPage,
  ],
  imports: [
    IonicPageModule.forChild(AccountPage),
    TranslateModule.forChild(),
    AccordionModule
  ],
  exports: [
    AccountPage
  ]
})
export class AccountPageModule {}
