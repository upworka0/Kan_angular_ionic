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
//import { CartPage } from '../cart/cart';
import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { PhServiceProvider } from '../../providers/ph-service/ph-service';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var HomePage = (function () {
    function HomePage(navCtrl, navParams, productService, cartService, phService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.productService = productService;
        this.cartService = cartService;
        this.phService = phService; 
        this.qty = {};
        this.qty.quantity = {};
        var user_data = localStorage.getItem('usersdata');
        this.productService.GetCategoryDetails().subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                _this.retriveProduct = response;
                _this.retriveProduct = _this.retriveProduct.data;
            }
        });
        
        this.phService.GetAllPh().subscribe(function (response) {
            if (response['status'] === 0) {
                _this.form_validation_error = response['error'];
            }
            else {
                _this.retrivePh = response;
                _this.retrivePh = _this.retrivePh.data;
            }
        });
        
        
        
        this.cart_items = cartService.cart_items;
        this.cart_total = cartService.grand_total;
    }
    // Add Product in Cart //
    HomePage.prototype.addProductCart = function (product, qty) {
        if (qty == undefined) {
            qty = 1;
        }
        this.cartService.addProductCart(product, qty);
    };
    // increment product qty
    HomePage.prototype.incrementQty = function (i) {
        if (isNaN(this.qty['quantity'][i])) {
            this.qty['quantity'][i] = 1;
        }
        this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) + 1;
    };
    // decrement product qty
    HomePage.prototype.decrementQty = function (i) {
        if (isNaN(this.qty['quantity'][i])) {
            this.qty['quantity'][i] = 1;
        }
        if (this.qty['quantity'][i] - 1 < 1) {
            this.qty['quantity'][i] = 1;
        }
        else {
            this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) - 1;
        }
    };
    HomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad HomePage');
    };
    HomePage.prototype.cartPage = function () {
        this.navCtrl.parent.select(1);
    };
    return HomePage;
}());
HomePage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-home',
        templateUrl: 'home.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, ProductServiceProvider, CartServiceProvider, PhServiceProvider])
], HomePage);
export { HomePage };
//# sourceMappingURL=home.js.map