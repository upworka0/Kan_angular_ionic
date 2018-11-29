import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { MerchantHomePage } from '../merchant-home/merchant-home';
import { MerchantOrderListPage } from '../merchant-order-list/merchant-order-list';
import { MerchantDepositsPage } from '../merchant-deposits/merchant-deposits';
import { MerchantAccountPage } from '../merchant-account/merchant-account';




/**
 * Generated class for the MerchantMainTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-merchant-main-tabs',
  templateUrl: 'merchant-main-tabs.html',
})
export class MerchantMainTabsPage {

  tab1Root: any = MerchantHomePage;
  tab2Root: any = MerchantOrderListPage;
  tab3Root: any = MerchantDepositsPage;
  tab4Root: any = MerchantAccountPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MerchantMainTabsPage');
  }

  

}
