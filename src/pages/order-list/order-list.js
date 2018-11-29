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
import { FinishedOrderDetailsPage } from '../finished-order-details/finished-order-details';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the OrderListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OrderListPage = (function () {
    function OrderListPage(navCtrl, navParams, orderService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.selectedSegment = 'onprocess';
    }
    OrderListPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.orderService.order_history().subscribe(function (response) {
            if (response['status'] === 0) {
                _this.response_error = response['error'];
            }
            else {
                console.log(response);
                _this.order_list = response['data'];
            }
        });
    };
    OrderListPage.prototype.onSegmentChanged = function (segmentButton) {
        console.log("Segment changed to", segmentButton.value);
    };
    OrderListPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OrderListPage');
    };
    OrderListPage.prototype.onprocessOrderDetails = function (orderId) {
        // this.navCtrl.push(OnprocessOrderDetailsPage, {
        //   orderId: orderId
        // });
    };
    OrderListPage.prototype.finishedOrderDetails = function (orderId) {
        this.navCtrl.push(FinishedOrderDetailsPage, {
            orderId: orderId
        });
    };
    return OrderListPage;
}());
OrderListPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-order-list',
        templateUrl: 'order-list.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, OrderServiceProvider])
], OrderListPage);
export { OrderListPage };
//# sourceMappingURL=order-list.js.map