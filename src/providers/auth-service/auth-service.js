var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../../app/appSettings';
import 'rxjs/add/operator/map';
/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
var AuthServiceProvider = (function () {
    function AuthServiceProvider(http) {
        this.http = http;
        this.apiUrl = AppSettings.API_ENDPOINT + 'api/user/';
        this.apiUrl_merchant = AppSettings.API_ENDPOINT + 'api/merchant/';
        this.baseURL = AppSettings.API_ENDPOINT;
        console.log('Hello AuthServiceProvider Provider');
    }
    AuthServiceProvider.prototype.register = function (post_data) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var post_params = {
            name: post_data.name,
            email: post_data.email,
            password: post_data.password,
            phone: post_data.phone,
            area_code: post_data.area_code
        };
        var link = this.apiUrl + "register";
        var data = post_data; /*JSON.stringify({post_data});*/
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    AuthServiceProvider.prototype.login = function (post_data) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var post_params = {
            name: post_data.name,
            email: post_data.email,
            password: post_data.password,
            phone: post_data.phone,
            area_code: post_data.area_code
        };
        var link = this.apiUrl + "login";
        var data = post_data;
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    AuthServiceProvider.prototype.get_account = function () {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var userdata = JSON.parse(localStorage.getItem('usersdata'));
        var post_params = {
            token: userdata.token
        };
        var link = this.apiUrl + "profile";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    AuthServiceProvider.prototype.update_account = function (post_data) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var userdata = JSON.parse(localStorage.getItem('usersdata'));
        var post_params = {
            token: userdata.token,
            name: post_data.name,
            email: post_data.email,
            phone: post_data.phone
        };
        var link = this.apiUrl + "profile/edit";
        var data = post_data;
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    AuthServiceProvider.prototype.update_password = function (post_data) {
        console.log(post_data);
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var userdata = JSON.parse(localStorage.getItem('usersdata'));
        var post_params = {
            token: userdata.token,
            old_password: post_data.old_password,
            new_password: post_data.new_password,
            confirm_password: post_data.confirm_password
        };
        var link = this.apiUrl + "reset-pass";
        var data = post_data;
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //mr92furqan 19-06-2017
    AuthServiceProvider.prototype.login_merchant = function (post_data) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var post_params = {
            email: post_data.email,
            password: post_data.password,
        };
        console.log(this.apiUrl_merchant);
        var link = this.apiUrl_merchant + "login";
        var data = post_data;
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //endof login_merchant
    AuthServiceProvider.prototype.getMerchantNear = function (post_data) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var post_params = {
            token: post_data.token,
            latitude: post_data.latitude,
            longitude: post_data.longitude
        };
        var link = this.apiUrl + "near-merchant";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    return AuthServiceProvider;
}());
AuthServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], AuthServiceProvider);
export { AuthServiceProvider };
//# sourceMappingURL=auth-service.js.map