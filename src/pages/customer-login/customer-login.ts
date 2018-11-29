import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RegisterCustomerPage } from '../register-customer/register-customer'; 
import { ForgetPasswordPage } from '../forget-password/forget-password';
import { NativeStorage } from '@ionic-native/native-storage';
import { MainTabsPage } from '../main-tabs/main-tabs';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase';
/**
 * Generated class for the CustomerLoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-login',
  templateUrl: 'customer-login.html',
})
export class CustomerLoginPage {
private myForm : FormGroup;
public form_validation_error;
public form_success_login;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public authService: AuthServiceProvider) {
    //required fields
     this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
	//this.form_success_login=localStorage.getItem('message');
	localStorage.removeItem('message');
  }
  login_user(){
     
    
	this.authService.login(this.myForm.value).subscribe(response => {

		if(response['status']===0){
			this.form_validation_error=response['error'];
		}else{
      let database = firebase.database();
      var dataexist: boolean = false;
      let notifToken=localStorage.getItem('notifToken');
      database.ref('/UserToken/' + response["id"]).once('value').then(function(data) {
        let token: any = null;
          if(data.val()){
            dataexist = true;
            token = data.val().token_notif;
          }
        if (!dataexist || token !== notifToken){
          database.ref('/UserToken').child(response["id"]).set({
            token_notif: notifToken,
          });
        }
        // ...
      });
			localStorage.setItem('user', 'true');
			localStorage.setItem('usersdata',JSON.stringify(response));
			this.navCtrl.setRoot(MainTabsPage);
		}
	});
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerLoginPage');
  }

  registerCustomer(){
    this.navCtrl.push(RegisterCustomerPage);
  }
  forgetPassword(){
    this.navCtrl.push(ForgetPasswordPage);
  }
  homePage()
  {
    this.navCtrl.push(MainTabsPage);
  }

}
