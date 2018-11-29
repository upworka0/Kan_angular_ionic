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
var MainTabsPage = (function () {
    function MainTabsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.tab1Root = HomePage;
        this.tab2Root = CartPage;
        this.tab3Root = OrderListPage;
        this.tab4Root = AccountPage;
    }
    MainTabsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MainTabsPage');
    };
    return MainTabsPage;
}());
MainTabsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-main-tabs',
        templateUrl: 'main-tabs.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams])
], MainTabsPage);
export { MainTabsPage };
//# sourceMappingURL=main-tabs.js.map