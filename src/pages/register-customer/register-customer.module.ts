import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RegisterCustomerPage } from './register-customer';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    RegisterCustomerPage,
  ],
  imports: [
    IonicPageModule.forChild(RegisterCustomerPage),
    TranslateModule.forChild(),
  ],
  exports: [
    RegisterCustomerPage
  ]
})
export class RegisterCustomerPageModule {}
