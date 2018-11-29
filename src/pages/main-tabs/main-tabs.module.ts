import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MainTabsPage } from './main-tabs';

@NgModule({
  declarations: [
    MainTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(MainTabsPage),
  ],
  exports: [
    MainTabsPage
  ]
})
export class MainTabsPageModule {}
