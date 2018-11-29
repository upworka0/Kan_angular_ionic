import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';


import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the MerchantCashPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-merchant-cash',
 	templateUrl: 'merchant-cash.html',
 })
 export class MerchantCashPage {
 	show_panel_user_info = true;
 	show_panel_edit_user = false;
 	

 	private myForm : FormGroup;
 	private changePwdForm : FormGroup;

 	public is_data;
 	public is_data_monthly;
 	public userdata;
 	public form_validation_error;
 	public form_success;
 	public deposit_settings;


 	public deposit_banks;
 	public deposit_amount;
 	public deposit_submit;
 	public deposit_amount_monthly;
 	public deposit_submit_monthly;
 	public data:any;
 	public data_monthly:any;
 	public deposit_error;
 	public deposit_error_monthly;
 	public deposit_submit_string;

 	selectedSegment: string;

 	constructor(public navCtrl: NavController, public navParams: NavParams,private formBuilder: FormBuilder,public authService: AuthServiceProvider,public toastCtrl: ToastController) {
 		this.selectedSegment = 'monthly';
 		this.is_data = false;
 		this.deposit_submit = 0.000;
 		this.deposit_submit_monthly = 0.000;
 		this.deposit_error = false;
 		this.deposit_error_monthly = false;


 	}
 	onSegmentChanged(segmentButton) {
 		console.log("Segment changed to", segmentButton.value);
 	}
 	

 	
 	update_settings()
 	{
 		this.authService.get_deposit_settings().subscribe(response => {

 			if(response['status']===0){
 				console.log(response);
 			}else{
 				this.is_data = true;
 				this.deposit_settings = response['settings'];
 				this.deposit_banks = response['banks'];
 				this.deposit_amount_monthly=this.deposit_settings.min_deposit_monthly;
 				this.deposit_monthly();
 			}
 		});
 	}
 	deposit_id(amount)
 	{
 		amount = Number(amount);
 		console.log("amount_before rem",amount);

 		
 		let rem_amount = amount % 1000;
 		console.log("rem",rem_amount);
 		amount = amount - rem_amount;
 		console.log("amount_after rem",amount);

 		let num = Math.floor(Math.random() * 900) + 100;
 		if(num%10 == 0)
 		{
 			num = Math.floor(Math.random() * 900) + 100;
 		}
 		if(num%10 == 0)
 		{
 			num = Math.floor(Math.random() * 900) + 100;
 		}
 		console.log(num);
 		localStorage.setItem("deposit_id", num.toString() );

 		//num = num / 1000
 		amount=amount + num;// adding payment id
 		//amount.toFixed(3);

 		return amount
 	}

 	deposit()
 	{
 		if(this.deposit_amount>=this.deposit_settings.min_deposit)
 		{
 			this.deposit_amount = this.deposit_amount | 0;
 			this.deposit_error = false;

 			this.deposit_submit = this.deposit_id(this.deposit_amount);
 			this.deposit_submit = (this.deposit_submit).toLocaleString();
 			this.deposit_submit = this.deposit_submit.replace(',', '.');
 			console.log(this.deposit_submit);
 			this.deposit_submit_string = String(this.deposit_submit);
 		}
 		else{
 			this.deposit_error = true;
 		}
 	}

 	deposit_amount_serv()
 	{
 		if(!this.deposit_error)
 		{
 			this.data = {
 				code : '',
 				amount :'',
 				no_deposit :'',
 			}	

 			this.data.code = JSON.parse(localStorage.getItem("deposit_id"));
 			
	 		this.deposit_submit = (this.deposit_submit).toLocaleString();
 			this.deposit_submit = this.deposit_submit.replace(',', '.');
 			this.data.amount = this.deposit_submit;
 			let num_deposit = Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
 			this.data.no_deposit = String(num_deposit);

 			this.authService.deposit_amount(this.data).subscribe(response => {

 				if(response['status']===0){
 					console.log(response);
 				}else{

 					//this.deposit_settings = response['settings'];
 					let toast = this.toastCtrl.create({
 						message: response['message'],
 						duration: 5000
 					});
 					toast.present();
 					this.navCtrl.pop();

 				}
 			});
 		}
 	}
 	deposit_monthly()
 	{
 		if(this.deposit_amount_monthly>=this.deposit_settings.min_deposit_monthly)
 		{
 			this.deposit_amount_monthly = this.deposit_amount_monthly | 0;
 			this.deposit_error_monthly = false;

 			this.deposit_submit_monthly = this.deposit_id(this.deposit_amount_monthly);
 			this.deposit_submit_monthly = (this.deposit_submit_monthly).toLocaleString();
 			this.deposit_submit_monthly = this.deposit_submit_monthly.replace(',', '.');
 			console.log(this.deposit_submit_monthly);
 			
 		}
 		else{
 			this.deposit_error_monthly = true;
 		}
 	}

 	deposit_amount_serv_monthly()
 	{
 		if(!this.deposit_error_monthly)
 		{
 			this.data_monthly = {
 				code : '',
 				amount :'',
 				no_deposit :'',
 			}	

 			this.data_monthly.code = JSON.parse(localStorage.getItem("deposit_id"));
 			this.deposit_submit_monthly = (this.deposit_submit_monthly).toLocaleString();
 			this.deposit_submit_monthly = this.deposit_submit_monthly.replace(',', '.'); 			

 			this.data_monthly.amount = this.deposit_submit_monthly;
 			let num_deposit_monthly = Math.floor(Math.random() * 9000000000000000) + 1000000000000000;
 			this.data_monthly.no_deposit = String(num_deposit_monthly);

 			this.authService.deposit_amount_monthly(this.data_monthly).subscribe(response => {

 				if(response['status']===0){
 					console.log(response);
 				}else{

 					//this.deposit_settings = response['settings'];
 					let toast = this.toastCtrl.create({
 						message: response['message'],
 						duration: 5000
 					});
 					toast.present();
 					this.navCtrl.pop();

 				}
 			});
 		}
 	}
 	ionViewDidEnter() {
 		this.is_data = false;

 		console.log('ionViewDidEnter MerchantCashPage');
 		
 		this.update_settings();
 	}
 	ionViewDidLoad() {
 		console.log('ionViewDidLoad MerchantCashPage');
 	}

 }
