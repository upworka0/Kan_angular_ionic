import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController  } from 'ionic-angular';
import {  App } from 'ionic-angular';
import { MerchantDepositBalancePage } from '../merchant-deposit-balance/merchant-deposit-balance';
import { MerchantCashPage } from '../merchant-cash/merchant-cash';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { UserTypePage } from '../user-type/user-type';

import {TranslateService} from '@ngx-translate/core';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the MerchantAccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
   selector: 'page-merchant-account',
   templateUrl: 'merchant-account.html',
 })
 export class MerchantAccountPage {
   show_panel_user_info = true;
   show_panel_edit_user = false;
   public profile_merchant ;

   private myForm : FormGroup;
   private changePwdForm : FormGroup;

   public is_data;
   public userdata;
   public form_validation_error;
   public form_success;
   public password_success;

   constructor(public app :App,public navCtrl: NavController, public navParams: NavParams,public translate: TranslateService
     ,private formBuilder: FormBuilder,public authService: AuthServiceProvider,public toastCtrl: ToastController) {
     console.log(this.userdata);
     this.myForm = this.formBuilder.group({
       email: [''],
       name: [''],
       phone: [''],
     });
     this.changePwdForm = this.formBuilder.group({
       old_password: [''],
       new_password: [''],
       confirm_password: [''],
     });

   }

   ionViewDidLoad() {
     console.log('ionViewDidLoad MerchantAccountPage');
   }

   ionViewDidEnter() {
     this.is_data = false;

     console.log('ionViewDidEnter MerchantAccountPage');
     this.profile();
   }

   profile(){
     this.authService.profile_merchant().subscribe(response => {

       if(response['status']===0){

         console.log(response['error']);
         this.is_data = false;
         
       }else{

         console.log(response);         
         this.profile_merchant = response['data'][0];
         if(this.profile_merchant.wallet)
         {
           // this.profile_merchant.wallet = (this.profile_merchant.wallet).toLocaleString();
           // this.profile_merchant.wallet = this.profile_merchant.wallet.replace(',', '');
         }
         localStorage.setItem('merchantProfile',JSON.stringify(response));
         this.is_data = true;
       }
     });
   }
   update_settings()
   {
     this.authService.update_merchantAccount(this.myForm.value).subscribe(response => {

       if(response['status']===0){
         this.form_validation_error=response['error'];
       }else{
         // localStorage.setItem('message',JSON.stringify(response['message']));
         this.form_success=response['message'];
         this.show_panel_edit_user = false;
         this.show_panel_user_info = true;
       }
     });
   }
   update_password()
   {
     this.authService.update_merchantPassword(this.changePwdForm.value).subscribe(response => {

       if(response['status']===0){
         this.form_validation_error=response['error'];
       }else{
         localStorage.setItem('message',JSON.stringify(response['message']));
         this.password_success=response['message'];
         this.form_validation_error='';
         this.show_panel_edit_user = false;
         this.show_panel_user_info = true;
       }
     });
   }
   profile_edit(){

     this.show_panel_edit_user = false;
     this.show_panel_user_info = true;
   }

   merchantDepositBalance() {
     this.navCtrl.push(MerchantDepositBalancePage);
   }
   merchantDepositSystem(){
     this.navCtrl.push(MerchantCashPage);

   }
   change_language(lang){
    localStorage.setItem('lang',lang);
     // the lang to use, if the lang isn't available, it will use the current loader to get them
     this.translate.use(lang);
   }
   logout()
   {
    let lang = localStorage.getItem('lang');

     this.authService.logout_merchant().subscribe(response => {
       if(response['status']===0)
       {
         console.log(response);
         localStorage.clear();
         localStorage.setItem('lang',lang);
         

         this.app.getRootNav().setRoot(UserTypePage);
       }
       else{
         console.log(response);
         localStorage.clear();
         localStorage.setItem('lang',lang);
         

         this.app.getRootNav().setRoot(UserTypePage);
       }

     });
   }

 }
