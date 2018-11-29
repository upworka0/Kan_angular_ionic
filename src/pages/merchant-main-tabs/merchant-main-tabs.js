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
var MerchantMainTabsPage = (function () {
    function MerchantMainTabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1Root = MerchantHomePage;
        this.tab2Root = MerchantOrderListPage;
        this.tab3Root = MerchantDepositsPage;
        this.tab4Root = MerchantAccountPage;
    }
    MerchantMainTabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantMainTabsPage');
    };
    return MerchantMainTabsPage;
}());
MerchantMainTabsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-main-tabs',
        templateUrl: 'merchant-main-tabs.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], MerchantMainTabsPage);
export { MerchantMainTabsPage };
//# sourceMappingURL=merchant-main-tabs.js.map