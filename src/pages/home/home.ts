import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { CartPage } from '../cart/cart';

import { ProductServiceProvider } from '../../providers/product-service/product-service';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';

import { PhServiceProvider } from '../../providers/ph-service/ph-service';
/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-home',
   templateUrl: 'home.html'
 })
 export class HomePage {
   public form_validation_error;
   public isBanner;
   public banners;
   public user_data;
   public cart_items;
   public cart_total;
   public qty:any;
   public retriveProduct;
   public retrivePh;
   constructor(public navCtrl: NavController, public navParams: NavParams,public productService: ProductServiceProvider, public cartService: CartServiceProvider, public phService: PhServiceProvider) {
     this.qty={};
     this.qty.quantity = {};
     this.qty.phLevel = {};
     let user_data=localStorage.getItem('usersdata');
     
   }
   ionViewDidEnter() {
     this.getBanners();
     this.qty={};
     this.qty.quantity = {};
       this.qty.phLevel = {}; 
     this.productService.GetCategoryDetails().subscribe(response => {
       if(response['status']===0){
         this.form_validation_error=response['error'];
       }else{
           
           this.retriveProduct=response;      
         this.retriveProduct=this.retriveProduct.data;
         
       }
     });
       
    this.phService.GetAllPh().subscribe(
        suc => {
            console.log("suc");
            console.log(JSON.stringify(suc));
            this.retrivePh=suc;      
            this.retrivePh=this.retrivePh.data;
        },
        err => {
            console.log("err" );
            console.log(JSON.stringify(err) );
        }
//        response => {
//        
//       if(response['status']===0){
//           console.log("status 0");
//         this.form_validation_error=response['error'];
//           
//       }else{
//           console.log("dsasddsdsa");
//         this.retrivePh=response;      
//         this.retrivePh=this.retrivePh.data;
//       }
//     }
                                       );
       
       

     if(this.cartService.order)
     {
       console.log(this.cartService.order.order_details);

       if(this.cartService.order.order_details && this.cartService.cart_items > 0 && this.cartService.grand_total >0)
       {
         console.log("Setting quantities");

         let length = this.cartService.order.order_details.length;
         let count=0
         let order_data_cart = this.cartService.order.order_details;

         for(count;count<length;count++)
         {
           console.log(length);
           let p_id = order_data_cart[count].product_id;
           this.qty['quantity'][p_id] = order_data_cart[count].qty;
         }
       }
     }
     this.cart_items = this.cartService.cart_items;
     this.cart_total = this.cartService.grand_total;
   }
   getBanners(){
     this.productService.GetBanners().subscribe(response => {
       if(response['status']===0){
         this.isBanner=false;
       }else{
         this.isBanner=true;

         this.banners=response['data'];
       }
     });
   }

   // Add Product in Cart //
   addProductCart(product,qty,ph)
   {


     if(qty==undefined){
       console.log("qty==undefined")
       qty=0;
     }
     if(qty == 0)
     {
       this.cartService.removeProductCart(product,qty);

     }
     else{
         
       this.cartService.addProductCart(product,qty,ph);
       
     }
     
   }

    // select ph
   selectPhLevel($event, i) {
       
       console.log($event.target.value + " Clicked!" + $event.target.selectedIndex + " pid" + i);
       console.log("changed");
     
     this.qty['phLevel'][i] = $event.target.selectedIndex ;
    console.log(this.qty['phLevel'][i]);
   }
    
   // increment product qty
   incrementQty(product,i) {
       
       if(this.qty['phLevel'][i] == null)
       {
           alert("Please Select Ph Level.");
           
       }else
       {
               if(isNaN(this.qty['quantity'][i])){
                   this.qty['quantity'][i]=0;
                 }
                 this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) + 1;

                 this.addProductCart(product,this.qty['quantity'][i], this.qty['phLevel'][i])
       }
       
       
       
     
   }

   // decrement product qty
   decrementQty(product,i) {
     if(isNaN(this.qty['quantity'][i])){
       this.qty['quantity'][i]=0;
     }
     if(this.cartService.grand_total >0)
     {
       if(this.qty['quantity'][i]-1 < 0 ){
         this.qty['quantity'][i] = 0
         this.addProductCart(product,this.qty['quantity'][i], this.qty['phLevel'][i]); 

       }else{
         this.qty['quantity'][i] = parseInt(this.qty['quantity'][i]) - 1;
         this.addProductCart(product,this.qty['quantity'][i], this.qty['phLevel'][i]);
       }
     }
     else{
       this.qty['quantity'][i] = 0
     }
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad HomePage');
   }

   cartPage() {
     // this.navCtrl.parent.select(1);
     this.navCtrl.push(CartPage);
   }

 }
