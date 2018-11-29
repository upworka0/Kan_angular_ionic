import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {  App } from 'ionic-angular';

import {Validators, FormBuilder, FormGroup } from '@angular/forms';

import { UserTypePage } from '../user-type/user-type';
import { CartServiceProvider } from '../../providers/cart-service/cart-service';
import {TranslateService} from '@ngx-translate/core';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
/**
 * Generated class for the AccountPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-account',
 	templateUrl: 'account.html',
 })
 export class AccountPage {

 	private myForm : FormGroup;
 	private changePwdForm : FormGroup;
 	show_panel_user_info = true;
 	show_panel_edit_user = false;
 	public userdata;
 	public form_validation_error;
 	public form_success;
 	public password_success;
 	public is_data;
 	constructor(public app:App,public navCtrl: NavController, public navParams: NavParams,public translate: TranslateService
 		,private formBuilder: FormBuilder,public cartService: CartServiceProvider,public authService: AuthServiceProvider) {

 		this.is_data = false;

 		//this.userdata=JSON.parse(localStorage.getItem('usersdata'));
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
 	update_settings()
 	{
 		this.authService.update_account(this.myForm.value).subscribe(response => {

 			if(response['status']===0){
 				this.form_validation_error=response['error'];
 			}else{
 				localStorage.setItem('message',JSON.stringify(response['message']));
 				this.form_success=response['message'];
 				this.show_panel_edit_user = false;
 				this.show_panel_user_info = true;
 			}
 		});
 	}
 	update_password()
 	{
 		this.authService.update_password(this.changePwdForm.value).subscribe(response => {

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
 	get_account(){
 		this.authService.get_account().subscribe(response => {
 			if(response['status']===0)
 			{
 				console.log(response);
 			}
 			else{
 				this.is_data = true;
 				this.userdata=response['data'];
 				console.log(this.userdata);
 				console.log('here');	
 			}

 		});

 	}
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad AccountPage');

 	}

 	ionViewDidEnter(){
 		this.get_account();
 	}
 	change_language(lang){
 		localStorage.setItem('lang',lang);
 		// the lang to use, if the lang isn't available, it will use the current loader to get them
 		this.translate.use(lang);
 	}
 	logout()
 	{
 		let lang = localStorage.getItem('lang');
 		this.authService.logout().subscribe(response => {
 			if(response['status']===0)
 			{
 				
 				console.log(response);
 				localStorage.clear();
 				this.cartService.remove_cart();
 				localStorage.setItem('lang',lang);

 				this.app.getRootNav().setRoot(UserTypePage);
 			}
 			else{
 				console.log(response);
 				localStorage.clear();
 				this.cartService.remove_cart();
 				localStorage.setItem('lang',lang);
 				
 				this.app.getRootNav().setRoot(UserTypePage);
 				

 			}

 		});
 	}

 }
