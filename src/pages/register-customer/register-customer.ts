import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CustomerLoginPage } from '../customer-login/customer-login'; 
import { NativeStorage } from '@ionic-native/native-storage';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import firebase from 'firebase';
import {TranslateService} from '@ngx-translate/core';
/**
 * Generated class for the RegisterCustomerPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-register-customer',
  templateUrl: 'register-customer.html',
})
export class RegisterCustomerPage {
private myForm : FormGroup;
	public form_validation_error;
	public form_success;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder,public authService: AuthServiceProvider, public translate: TranslateService) {
	//required fields
     this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
	  area_code: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterCustomerPage');
  }

  loginCustomer(){
    this.navCtrl.push(CustomerLoginPage);
  }
  register_user(){
	
	this.authService.register(this.myForm.value).subscribe(response => {

		if(response['status']===0){
			this.form_validation_error=response['error'];
		}else{
      localStorage.setItem('message',JSON.stringify(response['message']));
      let notifToken=localStorage.getItem('notifToken');
      let database = firebase.database();
      database.ref('/UserToken').child(response['id']).set({
            token_notif: notifToken
      });
			this.navCtrl.setRoot(CustomerLoginPage);
		}
		});
  }

}
