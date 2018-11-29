import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { RegisterCustomerPage } from '../register-customer/register-customer'; 
import { MerchantLoginPage } from '../merchant-login/merchant-login';
/**
 * Generated class for the UserTypePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-user-type',
  templateUrl: 'user-type.html',
})
export class UserTypePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserTypePage');
  }

  registerCustomer(){
    this.navCtrl.push(RegisterCustomerPage);
  }

  merchantLogin(){
    this.navCtrl.push(MerchantLoginPage);
  }

}
