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
import { MerchantDetailsPage } from '../merchant-details//merchant-details';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
/**
 * Generated class for the SearchMerchantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var SearchMerchantPage = (function () {
    function SearchMerchantPage(navCtrl, navParams, cartService, authService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartService = cartService;
        this.authService = authService;
        var usersdata = JSON.parse(localStorage.getItem('usersdata'));
        console.log(usersdata);
        var data = {
            latitude: '',
            longitude: '',
            token: ''
        };
        data.latitude = cartService.order.lat_destination;
        data.longitude = cartService.order.lng_destination;
        data.token = usersdata.token;
        this.authService.getMerchantNear(data).subscribe(function (response) {
            if (response['status'] === 0) {
                console.log(response);
                _this.navCtrl.pop();
            }
            else {
                console.log(response);
                localStorage.setItem('merchantNearBy', JSON.stringify(response));
                _this.navCtrl.push(MerchantDetailsPage);
            }
        });
        ////////////////////////////////////////////////////////////////////////////////////////
    }
    SearchMerchantPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SearchMerchantPage');
    };
    SearchMerchantPage.prototype.merchantDetails = function () {
        this.navCtrl.push(MerchantDetailsPage);
    };
    return SearchMerchantPage;
}());
SearchMerchantPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-search-merchant',
        templateUrl: 'search-merchant.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, CartServiceProvider, AuthServiceProvider])
], SearchMerchantPage);
export { SearchMerchantPage };
//# sourceMappingURL=search-merchant.js.map