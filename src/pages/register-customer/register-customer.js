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
import { CustomerLoginPage } from '../customer-login/customer-login';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the RegisterCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var RegisterCustomerPage = (function () {
    function RegisterCustomerPage(navCtrl, navParams, formBuilder, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.authService = authService;
        //required fields
        this.myForm = this.formBuilder.group({
            email: ['', Validators.required],
            name: ['', Validators.required],
            phone: ['', Validators.required],
            area_code: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    RegisterCustomerPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad RegisterCustomerPage');
    };
    RegisterCustomerPage.prototype.loginCustomer = function () {
        this.navCtrl.push(CustomerLoginPage);
    };
    RegisterCustomerPage.prototype.register_user = function () {
        var _this = this;
        this.authService.register(this.myForm.value).subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                localStorage.setItem('message', JSON.stringify(response['message']));
                _this.navCtrl.setRoot(CustomerLoginPage);
            }
        });
    };
    return RegisterCustomerPage;
}());
RegisterCustomerPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-register-customer',
        templateUrl: 'register-customer.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AuthServiceProvider])
], RegisterCustomerPage);
export { RegisterCustomerPage };
//# sourceMappingURL=register-customer.js.map