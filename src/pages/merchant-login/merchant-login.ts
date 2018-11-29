import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { ForgetPasswordPage } from '../forget-password/forget-password';
import { MerchantMainTabsPage } from '../merchant-main-tabs/merchant-main-tabs';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase';
/**
 * Generated class for the MerchantLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-merchant-login',
   templateUrl: 'merchant-login.html',
 })
 export class MerchantLoginPage {
   private myForm : FormGroup;
   public form_validation_error;
   public form_success;

   constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public authService: AuthServiceProvider) {
     //required fields

     this.myForm = this.formBuilder.group({
       email: ['', Validators.required],
       password: ['', Validators.required],
     });
     this.form_success=localStorage.getItem('message');
     localStorage.removeItem('message');
   }

   forgetPassword(){
     this.navCtrl.push(ForgetPasswordPage);
   }
   login_merchant()
   {
     
     this.authService.login_merchant(this.myForm.value).subscribe(response => {

       if(response['status']===0){
         this.form_validation_error=response['error'];
       }else{
          console.log(JSON.stringify(response));
          var database = firebase.database();
          var notifToken=localStorage.getItem('notifToken');
          console.log(notifToken);
          var dataexist: boolean = false;
          database.ref('/MerchantToken/' + response["id"]).once('value').then(function(data) {
            // console.log(JSON.stringify(data));
            // let token = data.val().token_notif;
            let token: any = null;
            if(data.val()){
              dataexist = true;
              token = data.val().token_notif;
            }
            
            if (!dataexist || token !== notifToken){
              database.ref('/MerchantToken').child(response["id"]).set({
                token_notif: notifToken,
              });
            }
            // ...
          });
          localStorage.setItem('merchant', 'true');
          localStorage.setItem('merchantData',JSON.stringify(response));
          this.navCtrl.setRoot(MerchantMainTabsPage);
       }
     });

   }
   merchantHome()
   {
     this.navCtrl.push(MerchantMainTabsPage);
   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MerchantLoginPage');
   }

 }
