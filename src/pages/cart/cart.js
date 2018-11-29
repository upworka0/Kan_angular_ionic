var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { OrderConfirmationPage } from '../order-confirmation/order-confirmation';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation. 2
 */
var CartPage = (function () {
    function CartPage(navCtrl, navParams, geolocation, cartService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.cartService = cartService;
        console.log(cartService.order);
        this.marker_latitude = '';
        this.marker_latitude = '';
        this.loadMap();
        this.Postcode = "";
        this.notify_msg = "";
    }
    CartPage.prototype.loadMap = function () {
        var _this = this;
        this.geolocation.getCurrentPosition().then(function (position) {
            var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            var mapOptions = {
                scrollwheel: false,
                center: latLng,
                zoom: 15,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.mapElement.nativeElement, mapOptions);
            _this.addMarker(latLng);
        }, function (err) {
            console.log(err);
        });
        (function (success) {
            console.log(success);
        });
    };
    CartPage.prototype.searchAdress = function () {
        var marker;
        var geocoder = new google.maps.Geocoder();
        var testmap1 = this.mapElement;
        var mycartService = this.cartService;
        var Postcode_address = this.Postcode;
        geocoder.geocode({ 'address': this.Postcode }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                var mapOptions = {
                    center: results[0].geometry.location,
                    zoom: 17,
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                this.map = new google.maps.Map(testmap1.nativeElement, mapOptions);
                var marker_1 = new google.maps.Marker({
                    map: this.map,
                    draggable: true,
                    animation: google.maps.Animation.DROP,
                    position: results[0].geometry.location
                });
                this.marker_latitude = marker_1.getPosition().lat();
                this.marker_longitude = marker_1.getPosition().lng();
                mycartService.addCartAddress(Postcode_address, this.marker_latitude, this.marker_longitude);
                google.maps.event.addListener(marker_1, 'dragend', function (event) {
                    var latLng = event.latLng;
                    this.marker_latitude = latLng.lat();
                    this.marker_longitude = latLng.lng();
                    console.log(this.marker_latitude);
                    console.log(this.marker_longitude);
                    mycartService.addCartAddress(Postcode_address, this.marker_latitude, this.marker_longitude);
                });
            }
            else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    };
    CartPage.prototype.addMarker = function (latLng) {
        var marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        this.marker_latitude = marker.position.lat();
        this.marker_longitude = marker.position.lng();
        google.maps.event.addListener(marker, 'dragend', function (event) {
            var latLng = event.latLng;
            this.marker_latitude = latLng.lat();
            this.marker_longitude = latLng.lng();
        });
    };
    CartPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CartPage');
        this.loadMap();
    };
    CartPage.prototype.orderConfirmation = function () {
        this.navCtrl.push(OrderConfirmationPage);
    };
    return CartPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], CartPage.prototype, "mapElement", void 0);
CartPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-cart',
        templateUrl: 'cart.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Geolocation, CartServiceProvider])
], CartPage);
export { CartPage };
//# sourceMappingURL=cart.js.map