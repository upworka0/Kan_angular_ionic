import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';

import { SearchMerchantPage } from '../search-merchant/search-merchant';

import { CartServiceProvider } from '../../providers/cart-service/cart-service';

import { OrderServiceProvider } from '../../providers/order-service/order-service';

import { OrderListPage } from '../order-list/order-list';

/**
 * Generated class for the OrderConfirmationPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-order-confirmation',
   templateUrl: 'order-confirmation.html',
 })
 export class OrderConfirmationPage {
   public qty:any;
   public cart_items;
   public cartService
   public orderService

   constructor(public navCtrl: NavController, public navParams: NavParams , public cartSrvc: CartServiceProvider,public toastCtrl: ToastController, public orderSrvc: OrderServiceProvider) {

     this.cartService = cartSrvc;
     this.orderService = orderSrvc;
     this.qty={};
     this.qty.quantity = {};
   }

   // increment product qty
   incrementQty(product,i) {
     if(isNaN(this.qty['quantity'][i])){
       this.qty['quantity'][i]=product.qty;
     }
     this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) + 1;
     this.cartService.update_quantity_item(product,this.qty['quantity'][i]);
     console.log(this.qty['quantity'][i]);
   }

   // decrement product qty
   decrementQty(product,i) {
     if(isNaN(this.qty['quantity'][i])){
       this.qty['quantity'][i]=product.qty;
     }
     console.log("before quantity",this.qty['quantity'][i]);

     if(this.qty['quantity'][i]-1 < 0 ){
       this.qty['quantity'][i] = 0

     }else{
       this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) - 1;

     }
     console.log("after quantity",this.qty['quantity'][i]);
     if(this.qty['quantity'][i]==0)
     {
       console.log("removing");
       console.log("product",product);
       this.cartService.removeProductCart_confirm(product,this.qty['quantity'][i]);

     }
     else{
       console.log("updating");

       this.cartService.update_quantity_item(product,this.qty['quantity'][i]);

     }
     console.log(this.qty['quantity'][i]);
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad OrderConfirmationPage');
   }

   searchMerchant()
   {
     let is_cart = localStorage.getItem('is_cart');
     if(is_cart == "true")
     {
       if(this.cartService.order && this.cartService.order.order_details.length>0)
       {
         this.navCtrl.push(SearchMerchantPage);
       }
       else{
         let toast = this.toastCtrl.create({
           message: 'Cart is empty!',
           duration: 3000
         });
         toast.present();
       }
     }
     else{
       console.log("no order in cart");
     }
     

   }

   order_submit()
   {
     let is_cart = localStorage.getItem('is_cart') ;
     if(is_cart == "true")
     {
       let usersdata = JSON.parse(localStorage.getItem('usersdata')) ;
       let cart_order = JSON.parse(localStorage.getItem('cart')) ;

       // let cart_order = this.cartService.order;
       cart_order.merchant_id=null;
       cart_order.origin=null;
       cart_order.lat_origin=null;
       cart_order.lng_origin=null;
       cart_order.distance= null;
       cart_order.token = usersdata.token;
       cart_order.product = cart_order.order_details;
       cart_order.price = parseInt(this.cartService.grand_total);
       cart_order.payment_id = 1;
      //  console.log(cart_order)

       this.orderService.create(cart_order).subscribe(response => {
         if(response['status'] === 0)
         {
            
           let toast = this.toastCtrl.create({
             message: response['error'],
             duration: 3000
           });
           toast.present();
         }
         else{
           console.log(response);

           localStorage.removeItem("is_cart");
           localStorage.removeItem("cart");
           this.cartService.remove_cart()
           // this.navCtrl.push(OrderListPage);
           this.navCtrl.push(SearchMerchantPage);
         }
       });

     }
     else{
       console.log("no order in cart");
     }
   }
 }
