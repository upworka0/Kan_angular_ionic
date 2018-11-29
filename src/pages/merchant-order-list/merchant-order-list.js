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
import { MerchantFinishedOrderDetailsPage } from '../merchant-finished-order-details/merchant-finished-order-details';
/**
 * Generated class for the MerchantOrderListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MerchantOrderListPage = (function () {
    function MerchantOrderListPage(navCtrl, navParams, orderService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.selectedSegment = 'onprocess';
        this.get_merchant_history();
    }
    MerchantOrderListPage.prototype.get_merchant_history = function () {
        var _this = this;
        this.orderService.get_merchant_history().subscribe(function (response) {
            if (response['status'] === 0) {
                console.log(response['error']);
            }
            else {
                console.log(response);
                _this.process_orderList = response['data'];
                localStorage.setItem('merchantonProcessOrders', JSON.stringify(response));
            }
        });
    };
    MerchantOrderListPage.prototype.onSegmentChanged = function (segmentButton) {
        console.log("Segment changed to", segmentButton.value);
    };
    MerchantOrderListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantOrderListPage');
    };
    MerchantOrderListPage.prototype.MerchantFinishedOrderList = function () {
        this.navCtrl.push(MerchantFinishedOrderDetailsPage, {
            firstPassed: "value 1",
            secondPassed: "value 2"
        });
    };
    MerchantOrderListPage.prototype.orderDetails = function (orderId) {
        this.navCtrl.push(MerchantFinishedOrderDetailsPage, {
            orderId: orderId,
            secondPassed: "value 2"
        });
    };
    return MerchantOrderListPage;
}());
MerchantOrderListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-order-list',
        templateUrl: 'merchant-order-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, OrderServiceProvider])
], MerchantOrderListPage);
export { MerchantOrderListPage };
//# sourceMappingURL=merchant-order-list.js.map