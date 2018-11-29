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
import { Validators, FormBuilder } from '@angular/forms';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { MerchantMainTabsPage } from '../merchant-main-tabs/merchant-main-tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the MerchantLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MerchantLoginPage = (function () {
    function MerchantLoginPage(navCtrl, navParams, formBuilder, authService) {
        //required fields
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.myForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.form_success = localStorage.getItem('message');
        localStorage.removeItem('message');
    }
    MerchantLoginPage.prototype.forgetPassword = function () {
        this.navCtrl.push(ForgetPasswordPage);
    };
    MerchantLoginPage.prototype.login_merchant = function () {
        var _this = this;
        this.authService.login_merchant(this.myForm.value).subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                console.log(response);
                localStorage.setItem('merchant', 'true');
                localStorage.setItem('merchantData', JSON.stringify(response));
                _this.navCtrl.setRoot(MerchantMainTabsPage);
            }
        });
    };
    MerchantLoginPage.prototype.merchantHome = function () {
        this.navCtrl.push(MerchantMainTabsPage);
    };
    MerchantLoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantLoginPage');
    };
    return MerchantLoginPage;
}());
MerchantLoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-login',
        templateUrl: 'merchant-login.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AuthServiceProvider])
], MerchantLoginPage);
export { MerchantLoginPage };
//# sourceMappingURL=merchant-login.js.map