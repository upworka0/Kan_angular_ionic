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
import { RegisterCustomerPage } from '../register-customer/register-customer';
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { MainTabsPage } from '../main-tabs/main-tabs';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the CustomerLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var CustomerLoginPage = (function () {
    function CustomerLoginPage(navCtrl, navParams, formBuilder, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.authService = authService;
        //required fields
        this.myForm = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required],
        });
        this.form_success = localStorage.getItem('message');
        localStorage.removeItem('message');
    }
    CustomerLoginPage.prototype.login_user = function () {
        var _this = this;
        this.authService.login(this.myForm.value).subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                localStorage.setItem('user', 'true');
                localStorage.setItem('usersdata', JSON.stringify(response));
                _this.navCtrl.setRoot(MainTabsPage);
            }
        });
    };
    CustomerLoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerLoginPage');
    };
    CustomerLoginPage.prototype.registerCustomer = function () {
        this.navCtrl.push(RegisterCustomerPage);
    };
    CustomerLoginPage.prototype.forgetPassword = function () {
        this.navCtrl.push(ForgetPasswordPage);
    };
    CustomerLoginPage.prototype.homePage = function () {
        this.navCtrl.push(MainTabsPage);
    };
    return CustomerLoginPage;
}());
CustomerLoginPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-customer-login',
        templateUrl: 'customer-login.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AuthServiceProvider])
], CustomerLoginPage);
export { CustomerLoginPage };
//# sourceMappingURL=customer-login.js.map