import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { AppSettings } from '../../app/appSettings';

declare var google;

/**
 * Generated class for the OnprocessOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-onprocess-order-details',
   templateUrl: 'onprocess-order-details.html',
 })
 export class OnprocessOrderDetailsPage {

   @ViewChild('map') mapElement: ElementRef;
   map: any;
   public order_data;
   public orderId;
   public orders_details;
   public origin_lat;
   public origin_lng;
   public merchant_lat;
   public merchant_lng;
   constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation, public orderService: OrderServiceProvider) {
   }
   ngAfterViewInit() {

   }

   loadMap(){

     let lat_o = String(this.origin_lat);
     let lng_o = String(this.origin_lng);
     let mapOptions = {
       center: {lat: this.origin_lat, lng:  this.origin_lng},
       zoom: 13,
       draggable: true,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

     var directionsDisplay = new google.maps.DirectionsRenderer({
       draggable: false,
       map: this.map
     });
     var directionsService = new google.maps.DirectionsService;

     directionsDisplay.setMap(this.map);

     var selectedMode = 'DRIVING';

     directionsService.route({
       origin: {lat: this.origin_lat, lng: this.origin_lng},  // Haight.
       destination: {lat:this.merchant_lat, lng: this.merchant_lng},  // Ocean Beach.
       // Note that Javascript allows us to access the constant
       // using square brackets and a string value as its
       // "property."
       travelMode: google.maps.TravelMode[selectedMode]
     }, function(response, status) {
       console.log("response",response);
       console.log("status",status);
       if (status == 'OK') {
         directionsDisplay.setDirections(response);
       } else {
         console.log('Directions request failed due to ' + status);
       }
     });

   }

   ionViewCanEnter()
   {
     console.log('ionViewCanEnter FinishedOrderDetailsPage');

     this.order_data = false;

     this.orderId = this.navParams.get("orderId");

     console.log(this.orderId);
     this.orderService.get_detail_user_history(this.orderId).subscribe(response => {

       if(response['status']===0){
         console.log("Error",response['error']);


       }else{

         console.log("response: ",response['data'][0]);

         this.orders_details = response['data'][0];
         this.order_data = true;
         console.log("orders_details.merchant_name",this.orders_details.merchant_name);
         if(this.orders_details.merchant_photo)
         {
           this.orders_details.merchant_photo = AppSettings.API_PICS + this.orders_details.merchant_photo;
         }
         else{
           this.orders_details.merchant_photo = AppSettings.API_PICS + "dummy.png";
         }

         this.origin_lat=Number(this.orders_details['lat_destination']);
         this.origin_lng=Number(this.orders_details['lng_destination']);
         this.merchant_lat=Number(this.orders_details['merchant_lat']);
         this.merchant_lng=Number(this.orders_details['merchant_lng']);

         this.loadMap();
       }
     });
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad OnprocessOrderDetailsPage');
   }

 }
