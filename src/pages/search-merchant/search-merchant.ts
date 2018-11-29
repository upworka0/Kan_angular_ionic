import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  ,ToastController } from 'ionic-angular';
import { MerchantDetailsPage } from '../merchant-details//merchant-details';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import { OrderListPage } from '../order-list/order-list';


/**
 * Generated class for the SearchMerchantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-search-merchant',
   templateUrl: 'search-merchant.html',
 })
 export class SearchMerchantPage {

   public no_merchant;

   constructor(public navCtrl: NavController, public navParams: NavParams, public cartService: CartServiceProvider, public toastCtrl: ToastController,
     public authService: AuthServiceProvider) {
     this.no_merchant = false;
     let usersdata = JSON.parse(localStorage.getItem('usersdata')) ;
     console.log(usersdata);
     let data ={
       latitude :'',
       longitude :'',
       token : ''
     };
     if(cartService.order)
     {

       data.latitude = cartService.order.lat_destination;
       data.longitude = cartService.order.lng_destination;
     }
     data.token = usersdata.token
     

     this.authService.getMerchantNear(data).subscribe(response => {
       console.log(JSON.stringify(response));
       if(response['status'] === 0)
       {
         if(response['message']=="Data not available")
         {
           this.no_merchant = true;
           let toast = this.toastCtrl.create({
             message: response['No Merchant Found'],
             duration: 3000
           });
           toast.present();
          //  this.navCtrl.push(OrderListPage);
         }
         else{
           let toast = this.toastCtrl.create({
             message: response['error'],
             duration: 3000
           });
           toast.present();
         }
       }
       else{
         localStorage.setItem('merchantNearBy',JSON.stringify(response));
         console.log(JSON.stringify(response));
         // this.navCtrl.push(MerchantDetailsPage);
         this.navCtrl.push(OrderListPage);
       }
     });
     ////////////////////////////////////////////////////////////////////////////////////////
   }
   back_order()
   {
     this.navCtrl.pop();
   }
   ionViewDidLoad() {
     console.log('ionViewDidLoad SearchMerchantPage');
   }

   merchantDetails(){
     this.navCtrl.push(MerchantDetailsPage);
   }
 }
