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
import { SearchMerchantPage } from '../search-merchant/search-merchant';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderConfirmationPage = (function () {
    function OrderConfirmationPage(navCtrl, navParams, cartSrvc, orderSrvc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.cartSrvc = cartSrvc;
        this.orderSrvc = orderSrvc;
        this.cartService = cartSrvc;
        this.orderService = orderSrvc;
        this.qty = {};
        this.qty.quantity = {};
    }
    // increment product qty
    OrderConfirmationPage.prototype.incrementQty = function (product, i) {
        if (isNaN(this.qty['quantity'][i])) {
            this.qty['quantity'][i] = product.qty;
        }
        this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) + 1;
        this.cartService.update_quantity_item(product, this.qty['quantity'][i]);
        console.log(this.qty['quantity'][i]);
    };
    // decrement product qty
    OrderConfirmationPage.prototype.decrementQty = function (product, i) {
        if (isNaN(this.qty['quantity'][i])) {
            this.qty['quantity'][i] = product.qty;
        }
        if (this.qty['quantity'][i] - 1 < 1) {
            this.qty['quantity'][i] = 1;
        }
        else {
            this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) - 1;
        }
        this.cartService.update_quantity_item(product, this.qty['quantity'][i]);
        console.log(this.qty['quantity'][i]);
    };
    OrderConfirmationPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderConfirmationPage');
    };
    OrderConfirmationPage.prototype.searchMerchant = function () {
        var is_cart = localStorage.getItem('is_cart');
        if (is_cart == "true") {
            this.navCtrl.push(SearchMerchantPage);
        }
        else {
            console.log("no order in cart");
        }
    };
    return OrderConfirmationPage;
}());
OrderConfirmationPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-order-confirmation',
        templateUrl: 'order-confirmation.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, CartServiceProvider, OrderServiceProvider])
], OrderConfirmationPage);
export { OrderConfirmationPage };
//# sourceMappingURL=order-confirmation.js.map