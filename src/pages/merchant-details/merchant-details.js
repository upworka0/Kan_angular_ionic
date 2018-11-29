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
import { RateMerchantPage } from '../rate-merchant/rate-merchant';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the MerchantDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var MerchantDetailsPage = (function () {
    function MerchantDetailsPage(navCtrl, navParams, geolocation, cartService, orderSrvc) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.cartService = cartService;
        this.orderSrvc = orderSrvc;
        this.orderService = orderSrvc;
        this.merchantnearby = JSON.parse(localStorage.getItem('merchantNearBy'));
        console.log("this.merchantnearby", this.merchantnearby);
        var cart_order = JSON.parse(localStorage.getItem('cart'));
        this.distance = 0;
        var length = this.merchantnearby.data.length;
        length = length - 1;
        console.log(length);
        for (var j = 0; j <= length; j++) {
            var new_merchant = this.merchantnearby.data[j];
            var merchant_latlng = new google.maps.LatLng(new_merchant.lat, new_merchant.lng);
            var customer_latlng = new google.maps.LatLng(cart_order.lat_destination, cart_order.lng_destination);
            var new_distance = google.maps.geometry.spherical.computeDistanceBetween(merchant_latlng, customer_latlng);
            if (this.distance == 0) {
                this.merchant = this.merchantnearby.data[j];
                this.distance = new_distance;
            }
            else if (new_distance < this.distance) {
                this.merchant = this.merchantnearby.data[j];
            }
        }
    }
    MerchantDetailsPage.prototype.ngAfterViewInit = function () {
        this.loadMap();
    };
    MerchantDetailsPage.prototype.loadMap = function () {
        var cart_order = JSON.parse(localStorage.getItem('cart'));
        this.origin_lat = Number(cart_order.lat_destination);
        this.origin_lng = Number(cart_order.lng_destination);
        this.merchant_lat = Number(this.merchant.lat);
        this.merchant_lng = Number(this.merchant.lng);
        var mapOptions = {
            center: { lat: cart_order.lat_destination, lng: cart_order.lng_destination },
            zoom: 13,
            draggable: true,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var directionsDisplay = new google.maps.DirectionsRenderer({
            draggable: true,
            map: this.map
        });
        var directionsService = new google.maps.DirectionsService;
        directionsDisplay.setMap(this.map);
        var selectedMode = 'DRIVING';
        directionsService.route({
            origin: { lat: this.origin_lat, lng: this.origin_lng },
            destination: { lat: this.merchant_lat, lng: this.merchant_lng },
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode]
        }, function (response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    MerchantDetailsPage.prototype.addMarker = function (latLng) {
        var marker = new google.maps.Marker({
            map: this.map,
            draggable: true,
            animation: google.maps.Animation.DROP,
            position: latLng
        });
        google.maps.event.addListener(marker, 'dragend', function (event) {
            var latLng = event.latLng;
            //   this.marker_latitude = latLng.lat();
            //    this.marker_longitude = latLng.lng();
        });
    };
    MerchantDetailsPage.prototype.addInfoWindow = function (marker, content) {
        var _this = this;
        var infoWindow = new google.maps.InfoWindow({
            content: content
        });
        google.maps.event.addListener(marker, 'click', function () {
            infoWindow.open(_this.map, marker);
        });
    };
    MerchantDetailsPage.prototype.calcRoute = function () {
    };
    MerchantDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MerchantDetailsPage');
    };
    MerchantDetailsPage.prototype.rateMerchant = function () {
        var _this = this;
        var is_cart = localStorage.getItem('is_cart');
        if (is_cart == "true") {
            var usersdata = JSON.parse(localStorage.getItem('usersdata'));
            var cart_order = JSON.parse(localStorage.getItem('cart'));
            // let cart_order = this.cartService.order;
            cart_order.merchant_id = this.merchant.id;
            cart_order.origin = this.merchant.address;
            cart_order.lat_origin = this.merchant_lat;
            cart_order.lng_origin = this.merchant_lng;
            cart_order.distance = this.distance;
            cart_order.token = usersdata.token;
            cart_order.product = cart_order.order_details;
            cart_order.price = parseInt(this.cartService.grand_total);
            cart_order.payment_id = parseInt(this.cartService.payment_id);
            console.log(cart_order);
            this.orderService.create(cart_order).subscribe(function (response) {
                if (response['status'] === 0) {
                    _this.response_error = response['error'];
                }
                else {
                    console.log(response);
                    _this.orderService.getOrderDetails(response['order_id']).subscribe(function (response) {
                        console.log(response);
                    });
                    _this.navCtrl.push(RateMerchantPage);
                }
            });
        }
        else {
            console.log("no order in cart");
        }
    };
    return MerchantDetailsPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], MerchantDetailsPage.prototype, "mapElement", void 0);
MerchantDetailsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-merchant-details',
        templateUrl: 'merchant-details.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Geolocation, CartServiceProvider, OrderServiceProvider])
], MerchantDetailsPage);
export { MerchantDetailsPage };
//# sourceMappingURL=merchant-details.js.map