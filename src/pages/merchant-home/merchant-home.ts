import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController } from 'ionic-angular';

import { MerchantOrderListPage } from '../merchant-order-list/merchant-order-list';

import { OrderServiceProvider } from '../../providers/order-service/order-service';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';


/**
 * Generated class for the MerchantHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-merchant-home',
   templateUrl: 'merchant-home.html',
 })
 export class MerchantHomePage {

   public error_msg;
   public waiting_orderList;

   constructor(public navCtrl: NavController, public navParams: NavParams,public orderService: OrderServiceProvider,public toastCtrl: ToastController) {


   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MerchantHomePage');
   }

   ionViewDidEnter() {
     this.error_msg = false;
     
     console.log('ionViewDidEnter MerchantHomePage');
     this.get_order_list();
   }


   get_order_list()
   {

     this.orderService.get_order_list_merchant().subscribe(response => {
    // this.orderService.get_order_list().subscribe(response => {

       if(response['status']===0){
         this.waiting_orderList = false;
         console.log(response['error']);
         this.error_msg = response['error'];
         
       }else{

         this.error_msg = false;
         
         this.waiting_orderList = response['data'];


         localStorage.setItem('merchantOrders',JSON.stringify(response));

       }
     });

   }

   update_order(status,orderId)
   {
     console.log("status",status);
     console.log("orderId",orderId);
     console.log("orderId",orderId);
     this.orderService.update_order(status,orderId).subscribe(response => {
       console.log(response); 
       if(response['status']===0){
         console.log(response['error']);
         let toast = this.toastCtrl.create({
           message: response['error'],
           duration: 3000
         });
         toast.present();
       }else{
         //after confirm changing status to on_process
         console.log("update_order_confirm", response);
         this.orderService.update_order("on_process",orderId).subscribe(response => {

           if(response['status']===0){

             console.log(response['error']);

             let toast = this.toastCtrl.create({
               message: response['error'],
               duration: 3000
             });
             toast.present();


           }else{
             console.log("update_order_process", response);
            //  this.backgroundGeolocation.start();             
             this.navCtrl.push(MerchantOrderListPage);

           }
         });

       }
     });

   }

 }
