import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { OrderServiceProvider } from '../../providers/order-service/order-service';
import { AppSettings } from '../../app/appSettings';

// Import ionic2-rating module-API_PICS
import { Ionic2RatingModule } from 'ionic2-rating';

/**
 * Generated class for the RateMerchantPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-rate-merchant',
   templateUrl: 'rate-merchant.html',
 })
 export class RateMerchantPage {
   private myForm : FormGroup;
   public orderData;
   public orderId;
   public summary;
   public rate;
   public is_data;
   constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,
     public orderService: OrderServiceProvider,public viewCtrl: ViewController) {

  //    this.myForm = this.formBuilder.group({
  //   summary: [''],
    
  // });
       this.is_data = false;

     this.orderId = this.navParams.get("orderId");

     this.orderService.getOrderDetails(this.orderId).subscribe(response => {
       this.is_data = true
       console.log(response);
        this.orderData =response['data'][0];

        if(this.orderData.photo_merchant)
        {
         this.orderData.photo_merchant = AppSettings.API_PICS + this.orderData.photo_merchant;
        }
        else{
          this.orderData.photo_merchant = AppSettings.API_PICS + "dummy.png"; 
        }
     });
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad RateMerchantPage');
   }

    closeModal() {
    this.viewCtrl.dismiss();
  }

   rateMerchant() {
    // this.navCtrl.parent.select(2);
    console.log("this.rate",this.rate);
    console.log("this.summary",this.summary);
    this.orderService.rating(this.orderId,this.rate,this.summary).subscribe(response => {
       if(response['status'] === 0)
       {
         console.log(response);
          
       }
       else{
        // console.log(response);
         this.navCtrl.pop();
       }
     });
   }

   onModelChange(event)
   {
     console.log(event)
     this.rate = event;
   }


 }
