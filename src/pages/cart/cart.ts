import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { OrderConfirmationPage } from '../order-confirmation/order-confirmation';

import { CartServiceProvider } from '../../providers/cart-service/cart-service';


declare var google;

/**
 * Generated class for the CartPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation. 2 
 */
 @IonicPage()
 @Component({
   selector: 'page-cart',
   templateUrl: 'cart.html',
 })
 export class CartPage {

   @ViewChild('map') mapElement: ElementRef;
   public notify_msg;
   public address;
   map: any;
   public marker_latitude;
   public marker_longitude;
   public Postcode;
   public testmap:any;
   constructor(public navCtrl: NavController, public navParams: NavParams, public geolocation: Geolocation,public toastCtrl: ToastController,public cartService: CartServiceProvider) {
     console.log(cartService.order);
     this.marker_latitude='';
     this.marker_longitude='';
     //this.loadMap();   
     this.Postcode ="";
     this.notify_msg="";	
   }
   
   loadMap(){
     var v_this = this;
     this.geolocation.getCurrentPosition().then((position) => {

       let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
       
       let mapOptions = {
         scrollwheel: false,
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
       
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       this.addMarker(latLng);
     }, (err) => {
       console.log("hereeee")

       console.log(err);
       let latLng = new google.maps.LatLng('-6.1846671739285215', '-6.1846671739285215');
       
       let mapOptions = {
         scrollwheel: false,
         center: latLng,
         zoom: 15,
         mapTypeId: google.maps.MapTypeId.ROADMAP
       }
       console.log("hereeee")
       this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
       this.addMarker(latLng);
     });
     
     (success) => {
       console.log(success);
     }

   }
   loadDefaultMap(lat ,lng ){
     if(!lat || !lng )
     {
       lat = '-6.1846671739285215';
       lng = '-6.1846671739285215';
     }


     let latLng = new google.maps.LatLng(lat,lng );

     let mapOptions = {
       scrollwheel: false,
       center: latLng,
       zoom: 15,
       mapTypeId: google.maps.MapTypeId.ROADMAP
     }

     this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
     this.addMarker(latLng);

   }
   searchAdress()
   {
     let marker;
     let geocoder = new google.maps.Geocoder();
     var testmap1 = this.mapElement;
     var mycartService = this.cartService;
     var mytoastCtrl = this.toastCtrl;
     var Postcode_address = this.Postcode;
     geocoder.geocode({ 'address': this.Postcode }, function (results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         let mapOptions = {
           center: results[0].geometry.location,
           zoom: 17,
           mapTypeId: google.maps.MapTypeId.ROADMAP
         }
         this.map = new google.maps.Map(testmap1.nativeElement, mapOptions);
         let marker = new google.maps.Marker({
           map: this.map,
           draggable: true,
           animation: google.maps.Animation.DROP,
           position: results[0].geometry.location
         });
         this.marker_latitude=marker.getPosition().lat();
         this.marker_longitude=marker.getPosition().lng();
         mycartService.addCartAddress(Postcode_address,this.marker_latitude,this.marker_longitude);
         google.maps.event.addListener(marker, 'dragend', function(event) {
           let latLng = event.latLng;
           this.marker_latitude = latLng.lat();
           this.marker_longitude = latLng.lng();
           
           console.log(this.marker_latitude);
           console.log(this.marker_longitude);
           mycartService.addCartAddress(Postcode_address,this.marker_latitude,this.marker_longitude);
           
         });
         
       } else {

         let toast = mytoastCtrl.create({
           message: 'Please add a valid address',
           duration: 3000
         });
         toast.present();
       }
     });
   }
   addMarker(latLng){

     let marker = new google.maps.Marker({
       map: this.map,
       draggable: true,
       animation: google.maps.Animation.DROP,
       position: latLng
     });
     this.marker_latitude=marker.position.lat();
     this.marker_longitude = marker.position.lng();

     google.maps.event.addListener(marker, 'dragend', function(event) {
       let latLng = event.latLng;
       this.marker_latitude = latLng.lat();
       this.marker_longitude = latLng.lng();
     });

   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad CartPage');
     if(this.cartService.order)
     {
       if(this.cartService.order.lat_destination && this.cartService.order.lng_destination && this.cartService.order.destination)
       {
         this.Postcode = this.cartService.order.destination;
         this.marker_latitude=this.cartService.order.lat_destination;
         this.marker_longitude=this.cartService.order.lng_destination;
         this.loadDefaultMap(this.marker_latitude,this.marker_longitude)
       }
       else{
         this.loadMap();

       }
     }
     
     else{
       this.loadMap();

     }
   }

   orderConfirmation() {
       console.log("this.cartService.order");
     console.log(JSON.stringify(this.cartService.order.order_details));

     if(this.cartService.order)
     {
       if(this.cartService.order.destination)
       {
         console.log("if(this.cartService.order.destination)");
          this.navCtrl.push(OrderConfirmationPage);
       }
       else{
         console.log("else(this.cartService.order.destination)");
          let toast = this.toastCtrl.create({
           message: 'Confirm your location',
           duration: 3000
         });
         toast.present();
       }
       

     }

     else{
       let toast = this.toastCtrl.create({
           message: 'Cart is empty!',
           duration: 3000
         });
         toast.present();
     }
   }

 }
