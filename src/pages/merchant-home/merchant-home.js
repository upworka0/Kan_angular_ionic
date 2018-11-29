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
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MerchantOrderListPage } from '../merchant-order-list/merchant-order-list';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the MerchantHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MerchantHomePage = (function () {
    function MerchantHomePage(navCtrl, navParams, orderService, toastCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.toastCtrl = toastCtrl;
    }
    MerchantHomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantHomePage');
    };
    MerchantHomePage.prototype.ionViewDidEnter = function () {
        this.error_msg = false;
        console.log('ionViewDidEnter MerchantHomePage');
        this.get_order_list();
    };
    MerchantHomePage.prototype.get_order_list = function () {
        var _this = this;
        this.orderService.get_order_list().subscribe(function (response) {
            if (response['status'] === 0) {
                _this.waiting_orderList = false;
                console.log(response['error']);
                _this.error_msg = response['error'];
            }
            else {
                _this.error_msg = false;
                _this.waiting_orderList = response['data'];
                localStorage.setItem('merchantOrders', JSON.stringify(response));
            }
        });
    };
    MerchantHomePage.prototype.update_order = function (status, orderId) {
        var _this = this;
        console.log("status", status);
        console.log("orderId", orderId);
        this.orderService.update_order(status, orderId).subscribe(function (response) {
            if (response['status'] === 0) {
                console.log(response['error']);
                var toast = _this.toastCtrl.create({
                    message: response['error'],
                    duration: 3000
                });
                toast.present();
            }
            else {
                //after confirm changing status to on_process
                console.log("update_order_confirm", response);
                _this.orderService.update_order("on_process", orderId).subscribe(function (response) {
                    if (response['status'] === 0) {
                        console.log(response['error']);
                        var toast = _this.toastCtrl.create({
                            message: response['error'],
                            duration: 3000
                        });
                        toast.present();
                    }
                    else {
                        console.log("update_order_process", response);
                        _this.navCtrl.push(MerchantOrderListPage);
                    }
                });
            }
        });
    };
    return MerchantHomePage;
}());
MerchantHomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-home',
        templateUrl: 'merchant-home.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, OrderServiceProvider, ToastController])
], MerchantHomePage);
export { MerchantHomePage };
//# sourceMappingURL=merchant-home.js.map