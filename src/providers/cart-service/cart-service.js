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
import { Http } from '@angular/http';
import { AppSettings } from '../../app/appSettings';
import 'rxjs/add/operator/map';
/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
var CartServiceProvider = (function () {
    function CartServiceProvider(http) {
        this.http = http;
        this.apiUrl = AppSettings.API_ENDPOINT + 'api/order/';
        this.baseURL = AppSettings.API_ENDPOINT;
        this.grand_total = 0;
        var already_cart = localStorage.getItem("is_cart");
        if (already_cart == "true") {
            var payment_id = localStorage.getItem("payment_id");
            var payment_num = Number(payment_id) / 1000;
            this.payment_id = payment_id;
            this.order = JSON.parse(localStorage.getItem("cart"));
            this.cart_items = this.order.order_details.length;
            var length_1 = this.order.order_details.length;
            length_1 = length_1 - 1;
            this.grand_total = this.grand_total; //+ payment_num
            for (var j = 0; j <= length_1; j++) {
                this.grand_total = this.grand_total + this.order.order_details[j].subtotal;
                //this.grand_total.toFixed(3);
                console.log(this.grand_total);
            }
        }
        else {
            var num = Math.floor(Math.random() * 900) + 100;
            localStorage.setItem("payment_id", num.toString());
            this.payment_id = num;
            num = num / 1000;
            this.cart_items = 0;
            this.grand_total = 0.00; //+ num;// adding payment id
            //	this.grand_total.toFixed(3);
        }
        console.log('Hello CartServiceProvider Provider');
    }
    CartServiceProvider.prototype.addProductCart = function (product, qty) {
        var is_already_cart_item = 0;
        var already_cart = localStorage.getItem("is_cart");
        if (already_cart == "true") {
            this.order = JSON.parse(localStorage.getItem("cart"));
        }
        else {
            this.order = {
                "merchant_id": '',
                "origin": '',
                "lat_origin": '',
                "lng_origin": '',
                "destination": '',
                "lat_destination": '',
                "lng_destination": '',
                "route_polyline": '',
                "payment_id": '',
                "order_type": 'product',
                "distance": '',
                "estimate_time": '',
            };
        }
        var details = {
            "product_id": product.id,
            "name": product.name,
            "price": product.price,
            "qty": qty,
            "subtotal": product.price * qty
        };
        if (this.order.order_details == undefined) {
            this.order.order_details = [
                {
                    "product_id": product.id,
                    "name": product.name,
                    "price": product.price,
                    "qty": qty,
                    "subtotal": product.price * qty
                }
            ];
            this.grand_total = this.grand_total + (product.price * qty);
            //this.grand_total.toFixed(3);
        }
        else {
            var i = 0;
            var length_2 = this.order.order_details.length;
            length_2 = length_2 - 1;
            for (var j = 0; j <= length_2; j++) {
                if (this.order.order_details[j].product_id === product.id) {
                    is_already_cart_item = 1;
                    //this.order.order_details.splice(j, 1);				
                }
            }
            if (is_already_cart_item == 0) {
                this.order.order_details.push(details);
                var length_3 = this.order.order_details.length;
                length_3 = length_3 - 1;
                for (var j = 0; j < length_3; j++) {
                    this.grand_total = this.grand_total + parseInt(this.order.order_details[j].subtotal);
                    //	this.grand_total.toFixed(3);
                }
            }
        }
        this.cart = this.order;
        localStorage.setItem("cart", JSON.stringify(this.order));
        localStorage.setItem("is_cart", "true");
        this.cart_items = this.order.order_details.length;
        console.log(this.cart);
    };
    // Update Cart //
    CartServiceProvider.prototype.update_quantity_item = function (product, qty) {
        this.order = JSON.parse(localStorage.getItem("cart"));
        var details = {
            "product_id": product.product_id,
            "name": product.name,
            "price": product.price,
            "qty": qty,
            "subtotal": product.price * qty
        };
        console.log(details);
        var i = 0;
        this.cart_index = -1;
        var length = this.order.order_details.length;
        length = length - 1;
        for (var j = 0; j <= length; j++) {
            if (this.order.order_details[j].product_id === product.product_id) {
                this.cart_index = j;
            }
        }
        if (this.cart_index > -1) {
            //this.order.order_details.splice(this.cart_index, 1);
            this.order.order_details[this.cart_index] = details;
            //this.order.order_details.push(details);
        }
        var items = this.order.order_details.length;
        this.grand_total = 0; //+ (this.payment_id / 1000); // adding payment id
        //this.grand_total.toFixed(3);
        items = items - 1;
        for (var j = 0; j <= items; j++) {
            this.grand_total = this.grand_total + parseInt(this.order.order_details[j].subtotal);
            //	this.grand_total.toFixed(3);
        }
        localStorage.setItem("cart", JSON.stringify(this.order));
        console.log(this.order);
    };
    CartServiceProvider.prototype.addCartAddress = function (address, lat, lng) {
        console.log("address:-", address);
        console.log("lat:-", lat);
        console.log("lng:-", lng);
        var already_cart = localStorage.getItem("is_cart");
        this.order = JSON.parse(localStorage.getItem("cart"));
        if (already_cart == "true") {
            this.order.destination = address;
            this.order.lat_destination = lat;
            this.order.lng_destination = lng;
            console.log("updating location");
            localStorage.setItem('message', 'Destination Address saved.');
            localStorage.setItem("cart", JSON.stringify(this.order));
        }
        else {
            localStorage.setItem('message', 'Your Cart is empty');
        }
        console.log(this.order);
    };
    return CartServiceProvider;
}());
CartServiceProvider = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], CartServiceProvider);
export { CartServiceProvider };
//# sourceMappingURL=cart-service.js.map