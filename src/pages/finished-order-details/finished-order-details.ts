import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ModalController } from 'ionic-angular';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { RateMerchantPage } from '../rate-merchant/rate-merchant';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { AppSettings } from '../../app/appSettings';

// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';

/**
 * Generated class for the FinishedOrderDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-finished-order-details',
   templateUrl: 'finished-order-details.html',
 })
 export class FinishedOrderDetailsPage {
   public order_data;
   public orderId;
   public orders_details;
   public isMerchant;
   constructor(public navCtrl: NavController, public navParams: NavParams, public orderService: OrderServiceProvider,
     public cartService: CartServiceProvider, public modalCtrl: ModalController) {

     
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad FinishedOrderDetailsPage');
   }
   ionViewCanEnter()
   {
     console.log('ionViewCanEnter FinishedOrderDetailsPage');

     this.order_data = false;
     this.isMerchant = false;

     this.orderId = this.navParams.get("orderId");
     
     console.log(this.orderId);
     this.orderService.get_detail_user_history(this.orderId).subscribe(response => {

       if(response['status']===0){
         console.log("Error",response['error']);


       }else{

         console.log("response: ",response['data'][0]);

         this.orders_details = response['data'][0];
         this.order_data = true;
         if(this.orders_details.merchant_id )
         {
           this.isMerchant = true
         }
         if(!this.orders_details.rate)
         {
           this.rateOrder(this.orders_details.order_id);
         }
         if(this.orders_details.merchant_photo)
         {
           this.orders_details.merchant_photo = AppSettings.API_PICS + this.orders_details.merchant_photo;
         }
         else{
           this.orders_details.merchant_photo = AppSettings.API_PICS + "dummy.png";
         }
         //  console.log("orders_details.merchant_name",this.orders_details.merchant_name);



       }
     });
   }
   rateOrder(orderId){

     if(this.orders_details.merchant_id)
     {
       let myModal = this.modalCtrl.create(RateMerchantPage,{
         orderId:orderId
       });
      myModal.present();
       // this.navCtrl.push(RateMerchantPage,{
       //   orderId:orderId
       // });
     }
   }

 }
