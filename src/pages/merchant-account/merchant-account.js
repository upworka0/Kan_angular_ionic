var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MerchantDepositBalancePage } from '../merchant-deposit-balance/merchant-deposit-balance';
/**
 * Generated class for the MerchantAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MerchantAccountPage = (function () {
    function MerchantAccountPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.show_panel_user_info = true;
        this.show_panel_edit_user = false;
    }
    MerchantAccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantAccountPage');
    };
    MerchantAccountPage.prototype.merchantDepositBalance = function () {
        this.navCtrl.push(MerchantDepositBalancePage);
    };
    return MerchantAccountPage;
}());
MerchantAccountPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-account',
        templateUrl: 'merchant-account.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], MerchantAccountPage);
export { MerchantAccountPage };
//# sourceMappingURL=merchant-account.js.map