import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchMerchantPage } from './search-merchant';
import { TranslateModule } from '@ngx-translate/core';
@NgModule({
  declarations: [
    SearchMerchantPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchMerchantPage),
    TranslateModule.forChild()
  ],
  exports: [
    SearchMerchantPage
  ]
})
export class SearchMerchantPageModule {}
