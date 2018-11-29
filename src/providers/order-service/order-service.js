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
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
var OrderServiceProvider = (function () {
    function OrderServiceProvider(http) {
        this.http = http;
        this.apiUrl = AppSettings.API_ENDPOINT + 'api/order/';
        this.apiUserUrl = AppSettings.API_ENDPOINT + 'api/user/';
        this.apiUrl_merchant = AppSettings.API_ENDPOINT + 'api/merchant/';
        this.baseURL = AppSettings.API_ENDPOINT;
        console.log('Hello OrderServiceProvider Provider');
    }
    //create order
    OrderServiceProvider.prototype.create = function (data) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var post_params = data;
        var link = this.apiUrl + "create";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //create order end
    OrderServiceProvider.prototype.getOrderDetails = function (orderId) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var usersdata = JSON.parse(localStorage.getItem('usersdata'));
        var post_params = {
            order_id: orderId,
            token: usersdata.token
        };
        var link = this.apiUserUrl + "get-order-ids";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    OrderServiceProvider.prototype.order_history = function () {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var usersdata = JSON.parse(localStorage.getItem('usersdata'));
        var post_params = {
            token: usersdata.token
        };
        var link = this.apiUrl + "get-user-history";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //mr92furqan 19-06-2017
    OrderServiceProvider.prototype.get_order_list = function () {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var merchantData = JSON.parse(localStorage.getItem('merchantData'));
        var post_params = {
            token: merchantData.token
        };
        var link = this.apiUrl + "get-order-list?token=" + merchantData.token;
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //mr92furqan 20-06-2017
    OrderServiceProvider.prototype.update_order = function (status, orderId) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var merchantData = JSON.parse(localStorage.getItem('merchantData'));
        var post_params = {
            token: merchantData.token,
            status: status,
            order_id: orderId,
        };
        var link = this.apiUrl + "update-order";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //mr92furqan 20-06-2017
    OrderServiceProvider.prototype.get_merchant_history = function () {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var merchantData = JSON.parse(localStorage.getItem('merchantData'));
        var post_params = {
            token: merchantData.token
        };
        var link = this.apiUrl + "get-merchant-history";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //mr92furqan 21-06-2017
    OrderServiceProvider.prototype.get_detail_merchant_history = function (orderId) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var merchantData = JSON.parse(localStorage.getItem('merchantData'));
        var post_params = {
            token: merchantData.token,
            order_id: orderId
        };
        var link = this.apiUrl + "get-detail-merchant-history";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    //mr92furqan 21-06-2017
    OrderServiceProvider.prototype.get_detail_user_history = function (orderId) {
        var headers = new Headers();
        headers.append("Access-Control-Allow-Origin", '*');
        headers.append("Access-Control-Allow-Methods", 'POST, GET');
        headers.append("Accept", 'application/json');
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        var options = new RequestOptions({ headers: headers });
        var merchantData = JSON.parse(localStorage.getItem('usersdata'));
        var post_params = {
            token: merchantData.token,
            order_id: orderId
        };
        var link = this.apiUrl + "get-detail-user-history";
        return this.http.post(link, post_params, options)
            .map(function (res) { return res.json(); });
    };
    return OrderServiceProvider;
}());
OrderServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], OrderServiceProvider);
export { OrderServiceProvider };
//# sourceMappingURL=order-service.js.map