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
import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the OnprocessOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
var OnprocessOrderDetailsPage = (function () {
    function OnprocessOrderDetailsPage(navCtrl, navParams, geolocation, orderService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.geolocation = geolocation;
        this.orderService = orderService;
    }
    OnprocessOrderDetailsPage.prototype.ngAfterViewInit = function () {
        // this.loadMap();
    };
    OnprocessOrderDetailsPage.prototype.loadMap = function () {
        var lat_o = String(this.origin_lat);
        var lng_o = String(this.origin_lng);
        var mapOptions = {
            center: { lat: this.origin_lat, lng: this.origin_lng },
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
        console.log("this.origin_lat", this.origin_lat);
        console.log("this.origin_lng", this.origin_lng);
        console.log("this.merchant_lat", this.merchant_lat);
        console.log("this.merchant_lng", this.merchant_lng);
        directionsService.route({
            origin: { lat: this.origin_lat, lng: this.origin_lng },
            destination: { lat: this.merchant_lat, lng: this.merchant_lng },
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode[selectedMode]
        }, function (response, status) {
            console.log("response", response);
            console.log("status", status);
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            }
            else {
                window.alert('Directions request failed due to ' + status);
            }
        });
    };
    OnprocessOrderDetailsPage.prototype.ionViewCanEnter = function () {
        var _this = this;
        console.log('ionViewCanEnter FinishedOrderDetailsPage');
        this.order_data = false;
        this.orderId = this.navParams.get("orderId");
        console.log(this.orderId);
        this.orderService.get_detail_user_history(this.orderId).subscribe(function (response) {
            if (response['status'] === 0) {
                console.log("Error", response['error']);
            }
            else {
                console.log("response: ", response['data'][0]);
                _this.orders_details = response['data'][0];
                _this.order_data = true;
                console.log("orders_details.merchant_name", _this.orders_details.merchant_name);
                _this.origin_lat = Number(_this.orders_details['lat_destination']);
                _this.origin_lng = Number(_this.orders_details['lng_destination']);
                _this.merchant_lat = Number(_this.orders_details['merchant_lat']);
                _this.merchant_lng = Number(_this.orders_details['merchant_lat']);
                _this.loadMap();
            }
        });
    };
    OnprocessOrderDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OnprocessOrderDetailsPage');
    };
    return OnprocessOrderDetailsPage;
}());
__decorate([
    ViewChild('map'),
    __metadata("design:type", ElementRef)
], OnprocessOrderDetailsPage.prototype, "mapElement", void 0);
OnprocessOrderDetailsPage = __decorate([
    IonicPage(),
    Component({
        selector: 'page-onprocess-order-details',
        templateUrl: 'onprocess-order-details.html',
    }),
    __metadata("design:paramtypes", [NavController, NavParams, Geolocation, OrderServiceProvider])
], OnprocessOrderDetailsPage);
export { OnprocessOrderDetailsPage };
//# sourceMappingURL=onprocess-order-details.js.map