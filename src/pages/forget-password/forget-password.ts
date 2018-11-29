import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomerLoginPage } from '../customer-login/customer-login'; 
/**
 * Generated class for the ForgetPasswordPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-forget-password',
  templateUrl: 'forget-password.html',
})
export class ForgetPasswordPage {
private myForm : FormGroup;
public forget_error;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, public toastCtrl: ToastController,public authService: AuthServiceProvider) {
    this.forget_error = '';
    //required fields
     this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }
  forget_pass(){
  this.forget_error = '';
    
  this.authService.forget_pass(this.myForm.value).subscribe(response => {

    if(response['status']===0){
      this.forget_error=response['error'];
    }else{
      let toast = this.toastCtrl.create({
           message: 'Please check your mail!',
           duration: 5000
         });
         toast.present();
      
    }
  });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgetPasswordPage');
  }

  loginCustomer(){
    this.navCtrl.push(CustomerLoginPage);
  }

}
