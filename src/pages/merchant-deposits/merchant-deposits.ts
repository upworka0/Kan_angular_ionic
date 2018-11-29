import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MerchantDepositsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-merchant-deposits',
   templateUrl: 'merchant-deposits.html',
 })
 export class MerchantDepositsPage {
   selectedSegment: string;
   is_data;
   deposit_list;
   constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider) {
     this.selectedSegment = 'onprocess';
   }

   onSegmentChanged(segmentButton) {
     console.log("Segment changed to", segmentButton.value);
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MerchantDepositsPage');
   }

   ionViewDidEnter(){
     this.get_deposits();    
   }

   get_deposits()
   {
     this.authService.get_deposits().subscribe(response => {
       if(response['status']===0){          
       }else{
         this.is_data = false;     
         let balance_deposits =  response['settings'];
          this.deposit_list = response['settings'][0];
          console.log("before",this.deposit_list);

          
       }
     });
   }

 }
