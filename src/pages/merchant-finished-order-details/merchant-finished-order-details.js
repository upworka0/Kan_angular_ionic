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
import { AlertController, ToastController } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the MerchantFinishedOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MerchantFinishedOrderDetailsPage = (function () {
    function MerchantFinishedOrderDetailsPage(navCtrl, navParams, orderService, alertCtrl, toastCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.orderService = orderService;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.order_data = false;
        this.orderId = navParams.get("orderId");
        this.secondParam = navParams.get("secondPassed");
        console.log(this.orderId, this.secondParam);
        this.orderService.get_detail_merchant_history(this.orderId).subscribe(function (response) {
            if (response['status'] === 0) {
                console.log("Error", response['error']);
            }
            else {
                console.log("response: ", response['data'][0]);
                _this.orders_details = response['data'][0];
                _this.order_data = true;
            }
        });
    }
    MerchantFinishedOrderDetailsPage.prototype.updateOrder = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'Confirm delivery',
            message: 'Do you want to finish this order?',
            buttons: [
                {
                    text: 'No',
                    role: 'cancel',
                    handler: function () {
                        var toast = _this.toastCtrl.create({
                            message: 'Cancel clicked',
                            duration: 3000
                        });
                        toast.present();
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        _this.orderService.update_order("on_deliver", _this.orderId).subscribe(function (response) {
                            if (response['status'] === 0) {
                                console.log(response['error']);
                            }
                            else {
                                console.log("update_order_deliver", response);
                                _this.orderService.update_order("finish", _this.orderId).subscribe(function (response) {
                                    if (response['status'] === 0) {
                                        console.log(response['error']);
                                        var toast = _this.toastCtrl.create({
                                            message: 'Order updated successfully',
                                            duration: 3000
                                        });
                                        toast.present();
                                    }
                                    else {
                                        console.log("update_order_process", response);
                                    }
                                });
                            }
                        });
                    }
                }
            ]
        });
        alert.present();
    };
    MerchantFinishedOrderDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantFinishedOrderDetailsPage');
    };
    return MerchantFinishedOrderDetailsPage;
}());
MerchantFinishedOrderDetailsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-finished-order-details',
        templateUrl: 'merchant-finished-order-details.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, OrderServiceProvider,
        AlertController, ToastController])
], MerchantFinishedOrderDetailsPage);
export { MerchantFinishedOrderDetailsPage };
//# sourceMappingURL=merchant-finished-order-details.js.map