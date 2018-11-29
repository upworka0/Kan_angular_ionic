import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { OrderServiceProvider } from '../../providers/order-service/order-service';

import { MerchantFinishedOrderDetailsPage } from '../merchant-finished-order-details/merchant-finished-order-details';
/**
 * Generated class for the MerchantOrderListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-merchant-order-list',
   templateUrl: 'merchant-order-list.html',
 })
 export class MerchantOrderListPage {
   public process_orderList;
   selectedSegment: string;
   constructor(public navCtrl: NavController, public navParams: NavParams,public orderService: OrderServiceProvider) {

     this.selectedSegment = 'onprocess';
     
   }

   ionViewDidEnter(){
     let showFinished = this.navParams.get("showFinished");
     if(showFinished)
     {
     this.selectedSegment = 'finished';
       
     }
     this.get_merchant_history();
   }

   get_merchant_history()
   {
     this.orderService.get_merchant_history().subscribe(response => {

       if(response['status']===0){
         console.log(response['error']);

       }else{

         console.log(response);

         this.process_orderList = response['data'];

         localStorage.setItem('merchantonProcessOrders',JSON.stringify(response));

       }
     });
   }

   onSegmentChanged(segmentButton) {
     console.log("Segment changed to", segmentButton.value);
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MerchantOrderListPage');
   }

   MerchantFinishedOrderList() {
     this.navCtrl.push(MerchantFinishedOrderDetailsPage, {
       firstPassed: "value 1",
       secondPassed: "value 2"
     });
   }

   orderDetails(orderId) {
     this.navCtrl.push(MerchantFinishedOrderDetailsPage, {
       orderId: orderId,
       secondPassed: "value 2"
     });
   }

 }
