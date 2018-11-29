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
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
/**
 * Generated class for the FinishedOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var FinishedOrderDetailsPage = (function () {
    function FinishedOrderDetailsPage(navCtrl, navParams, orderService, cartService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.cartService = cartService;
    }
    FinishedOrderDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FinishedOrderDetailsPage');
    };
    FinishedOrderDetailsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionViewCanEnter FinishedOrderDetailsPage');
        this.order_data = false;
        this.orderId = this.navParams.get("orderId");
        console.log(this.orderId);
        this.orderService.get_detail_user_history(this.orderId).subscribe(function (response) {
            if (response['status'] === 0) {
                console.log("Error", response['error']);
            }
            else {
                console.log("response: ", response['data'][0]);
                _this.orders_details = response['data'][0];
                _this.order_data = true;
                console.log("orders_details.merchant_name", _this.orders_details.merchant_name);
            }
        });
    };
    return FinishedOrderDetailsPage;
}());
FinishedOrderDetailsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-finished-order-details',
        templateUrl: 'finished-order-details.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, OrderServiceProvider, CartServiceProvider])
], FinishedOrderDetailsPage);
export { FinishedOrderDetailsPage };
//# sourceMappingURL=finished-order-details.js.map