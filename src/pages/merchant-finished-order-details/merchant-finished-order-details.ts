import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams  } from 'ionic-angular';
import { AlertController, ToastController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { MerchantOrderListPage } from '../merchant-order-list/merchant-order-list';
import { AppSettings } from '../../app/appSettings';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';

declare var google;

/**
 * Generated class for the MerchantFinishedOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-merchant-finished-order-details',
 	templateUrl: 'merchant-finished-order-details.html',
 })
 export class MerchantFinishedOrderDetailsPage {
	@ViewChild('map') mapElement: ElementRef;
	map: any;
 	public orderId;
 	public secondParam;
 	public orders_details;
 	public order_data;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public orderService: OrderServiceProvider,
 		public alertCtrl: AlertController,public toastCtrl: ToastController,public translate: TranslateService) {
 		this.order_data = false;

 		this.orderId = navParams.get("orderId");
 		this.secondParam = navParams.get("secondPassed");
 		console.log(this.orderId,this.secondParam);
 	}

	 loadMap(){
		
			 let lat_o = String(this.orders_details.lat_origin);
			 let lng_o = String(this.orders_details.lng_origin);
			 let mapOptions = {
			   center: {lat: this.orders_details.lat_origin, lng:  this.orders_details.lng_origin},
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
			   origin: {lat: this.orders_details.lat_origin, lng: this.orders_details.lng_origin},  // Haight.
			   destination: {lat:this.orders_details.lat_destination, lng: this.orders_details.lng_destination},  // Ocean Beach.
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

 	updateOrder() {
 		let alertTitle;
 		this.translate.get('t_finish_alert').subscribe(
 			value => {
 				// value is our translated string
 				alertTitle = value;
 			}
 			)
 		let alert = this.alertCtrl.create({
 			title: 'Confirm delivery',
 			message: alertTitle, 
 			buttons: [
 			{
 				text: 'No',
 				role: 'cancel',
 				handler: () => {

 					
 					console.log('Cancel clicked');
 				}
 			},
 			{
 				text: 'Yes',
 				handler: () => {
 					this.orderService.update_order("on_deliver",this.orderId).subscribe(response => {

 						if(response['status']===0){

 							console.log(response['error']);
 							

 							let toast = this.toastCtrl.create({
 								message: response['error'],
 								duration: 3000
 							});
 							toast.present();

 						}else{
 							console.log("update_order_deliver", response);
 							this.orderService.update_order("finish",this.orderId).subscribe(response => {

 								if(response['status']===0){

 									console.log(response['error']);

 									let toast = this.toastCtrl.create({
 										message: response['error'],
 										duration: 3000
 									});
 									toast.present();


 								}else{
 									console.log("update_order_process", response);

 									let toast = this.toastCtrl.create({
 										message: response['message'],
 										duration: 3000
 									});
 									toast.present();

 									// this.navCtrl.pop();
 									this.navCtrl.push(MerchantOrderListPage
 										,{
 											showFinished:true
 										});
								 }
								// this.backgroundGeolocation.stop();
 							}); 

 						}
 					});
 				}
 			}
 			]
 		});
 		alert.present();
	 }

	 ionViewCanEnter(){
		console.log('ionViewCanEnter MerchantFinishedOrderDetailsPage');
		this.orderService.get_detail_merchant_history(this.orderId).subscribe(response => {
			if(response['status']===0){
				console.log("Error",response['error']);


			}else{

				console.log("response: ",response['data'][0]);

				this.orders_details = response['data'][0];
				this.order_data = true;
				if(this.orders_details.merchant_photo)
				{
					this.orders_details.merchant_photo = AppSettings.API_PICS + this.orders_details.merchant_photo;
				}
				else{
					this.orders_details.merchant_photo = AppSettings.API_PICS + "dummy.png";
				}
				this.loadMap();

			}
		});
	 }

 	ionViewDidLoad() {
		 console.log('ionViewDidLoad MerchantFinishedOrderDetailsPage');
 	}

 }
