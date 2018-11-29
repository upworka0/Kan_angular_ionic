import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { OrderListPage } from '../order-list/order-list';
import { AccountPage } from '../account/account';

/**
 * Generated class for the MainTabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-main-tabs',
  templateUrl: 'main-tabs.html',
})
export class MainTabsPage {

  tab1Root: any = HomePage;
  tab2Root: any = CartPage;
  tab3Root: any = OrderListPage;
  tab4Root: any = AccountPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainTabsPage');
  }

}
