import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

import { OnprocessOrderDetailsPage } from '../onprocess-order-details/onprocess-order-details';
import { FinishedOrderDetailsPage } from '../finished-order-details/finished-order-details';

import { OrderServiceProvider } from '../../providers/order-service/order-service';
/**
 * Generated class for the OrderListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-order-list',
   templateUrl: 'order-list.html',
 })
 export class OrderListPage {

   selectedSegment: string;
   public response_error;
   public order_list;
   constructor(public navCtrl: NavController, public navParams: NavParams,public orderService: OrderServiceProvider, public alertCtrl: AlertController) {
     this.selectedSegment = 'pending';

   }

   ionViewDidEnter() {
     this.orderService.order_history().subscribe(response => {
       if(response['status'] === 0)
       {
         this.response_error=response['error'];
       }
       else{
         console.log(JSON.stringify(response));
         this.order_list =response['data']
       }
     });
   }

   onSegmentChanged(segmentButton) {
     console.log("Segment changed to", segmentButton.value);
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad OrderListPage');
   }

   onprocessOrderDetails(orderId,status) {
     if(status == 'on_process')
     {
       this.navCtrl.push(OnprocessOrderDetailsPage, {
         orderId: orderId
       });
     }
   }
   finishedOrderDetails(orderId){
     this.navCtrl.push(FinishedOrderDetailsPage, {
       orderId: orderId
     });
   }

    showPrompt(o_id) {
    let prompt = this.alertCtrl.create({
      message: "Reason For Cancel",
      inputs: [
        {
          name: 'title',
          placeholder: 'Enter your reason'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
              
            console.log(JSON.stringify(data));
              var reason = data.title;
              this.orderService.order_cancel(o_id, reason).subscribe(
                  suc => {
                    console.log("suc");
                    console.log(JSON.stringify(suc));

                },
                err => {
                    console.log("err" );
                    console.log(JSON.stringify(err) );
                }
//                  response => {
//               if(response['status'] === 0)
//               {
//                 this.response_error=response['error'];
//               }
//               else{
//                 console.log(JSON.stringify(response));
//                 this.order_list =response['data']
//               }
//             }
              );
          }
        }
      ]
    });
    prompt.present();
    }

 }
