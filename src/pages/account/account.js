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
import { FormBuilder } from '@angular/forms';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var AccountPage = (function () {
    function AccountPage(navCtrl, navParams, formBuilder, authService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.formBuilder = formBuilder;
        this.authService = authService;
        this.show_panel_user_info = true;
        this.show_panel_edit_user = false;
        //this.authService.get_account().subscribe(response => {
        //	this.userdata=response['data'];
        //	console.log(this.userdata);
        //	console.log('here');
        //});
        this.userdata = JSON.parse(localStorage.getItem('usersdata'));
        console.log(this.userdata);
        this.myForm = this.formBuilder.group({
            email: [''],
            name: [''],
            phone: [''],
        });
        this.changePwdForm = this.formBuilder.group({
            old_password: [''],
            new_password: [''],
            confirm_password: [''],
        });
    }
    AccountPage.prototype.update_settings = function () {
        var _this = this;
        this.authService.update_account(this.myForm.value).subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                localStorage.setItem('message', JSON.stringify(response['message']));
                _this.form_success = response['message'];
                _this.show_panel_edit_user = false;
                _this.show_panel_user_info = true;
            }
        });
    };
    AccountPage.prototype.update_password = function () {
        var _this = this;
        this.authService.update_password(this.changePwdForm.value).subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                localStorage.setItem('message', JSON.stringify(response['message']));
                _this.password_success = response['message'];
                _this.form_validation_error = '';
                _this.show_panel_edit_user = false;
                _this.show_panel_user_info = true;
            }
        });
    };
    AccountPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad AccountPage');
    };
    return AccountPage;
}());
AccountPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-account',
        templateUrl: 'account.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, FormBuilder, AuthServiceProvider])
], AccountPage);
export { AccountPage };
//# sourceMappingURL=account.js.map