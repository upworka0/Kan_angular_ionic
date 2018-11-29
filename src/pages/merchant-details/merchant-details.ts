import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { RateMerchantPage } from '../rate-merchant/rate-merchant';
import { OrderListPage } from '../order-list/order-list';

import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { OrderServiceProvider } from '../../providers/order-service/order-service';

declare var google;

/**
 * Generated class for the MerchantDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-merchant-details',
   templateUrl: 'merchant-details.html',
 })
 export class MerchantDetailsPage {

   @ViewChild('map') mapElement: ElementRef;
   map: any;
   merchantnearby:any;
   merchant: any;
   testmap:any;
   public origin_lat;
   public origin_lng;
   public merchant_lat;
   public merchant_lng;
   public orderService;
   public response_error;
   public distance;
   constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,
     public toastCtrl: ToastController,public cartService: CartServiceProvider,public orderSrvc: OrderServiceProvider) {
     this.orderService = orderSrvc;
     this.merchantnearby = JSON.parse(localStorage.getItem('merchantNearBy'));


     this.distance=0;

   }
   ngAfterViewInit() {

   }
   loadMap(){
     let cart_order = JSON.parse(localStorage.getItem('cart')) ;
     console.log(JSON.stringify(cart_order));
     this.origin_lat=Number(cart_order.lat_destination);
     this.origin_lng=Number(cart_order.lng_destination);
     // this.merchant_lat=Number(this.merchant.lat);
     // this.merchant_lng=Number(this.merchant.lng);
     var center_lat ;
     var center_lng;
     if(this.merchantnearby)
     {
       center_lat = Number(this.merchantnearby.data[0].lat);
       center_lng = Number(this.merchantnearby.data[0].lng);

     }
     else{
       center_lat = Number(cart_order.lat_destination);
       center_lng = Number(cart_order.lng_destination);

     }
     let mapOptions = {
       center: {lat: center_lat, lng: center_lng},
       zoom: 8,
       draggable: true,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);



   }

   addMarker(latLng){
     console.log("adding marker")
     let marker = new google.maps.Marker({
       map: this.map,
       draggable: true,
       animation: google.maps.Animation.DROP,
       position: latLng
     });


     google.maps.event.addListener(marker, 'dragend', function(event) {
       let latLng = event.latLng;
       // this.marker_latitude = latLng.lat();
       //  this.marker_longitude = latLng.lng();
     });

   }

   addInfoWindow(marker, content){

     let infoWindow = new google.maps.InfoWindow({
       content: content
     });

     google.maps.event.addListener(marker, 'click', () => {
       infoWindow.open(this.map, marker);
     });

   }

   calcRoute() {

   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MerchantDetailsPage');


     let cart_order = JSON.parse(localStorage.getItem('cart')) ;
     this.loadMap();
     if(this.merchantnearby)

     {
       let length = this.merchantnearby.data.length;
       length = length -1;
       for (let j=0; j<=length;j++)
       {
         let new_merchant = this.merchantnearby.data[j];
         var merchant_latlng = new google.maps.LatLng(new_merchant.lat,new_merchant.lng);
         var customer_latlng = new google.maps.LatLng(cart_order.lat_destination,cart_order.lng_destination);
         let latLng = new google.maps.LatLng(new_merchant.lat,new_merchant.lng);
         this.addMarker(latLng);

       }
     }
   }

   rateMerchant(){
     
   }

 }
