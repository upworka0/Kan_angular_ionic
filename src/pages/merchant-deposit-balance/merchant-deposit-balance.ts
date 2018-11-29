import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,ToastController } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the MerchantDepositBalancePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
 @IonicPage()
 @Component({
 	selector: 'page-merchant-deposit-balance',
 	templateUrl: 'merchant-deposit-balance.html',
 })
 export class MerchantDepositBalancePage {
 	public deposit_settings;
 	public is_data;
 	public deposit_amount;
 	public deposit_submit;
 	public data:any;
 	public deposit_error;
 	public deposit_submit_string;
 	constructor(public navCtrl: NavController, public navParams: NavParams,public authService: AuthServiceProvider,public toastCtrl: ToastController) {
 		this.deposit_submit = 0.000;
 		this.deposit_error = false;
 		this.is_data = false;
 		this.update_settings();
 	}

 	ionViewDidLoad() {
 		console.log('ionViewDidLoad MerchantDepositBalancePage');
 	}
 	update_settings()
 	{
 		this.authService.get_deposit_settings().subscribe(response => {

 			if(response['status']===0){
 				console.log(response);
 			}else{
 				this.is_data = true;
 				this.deposit_settings = response['settings'];
 			}
 		});
 	}

 	deposit()
 	{
 		if(this.deposit_amount>=this.deposit_settings.min_deposit)
 		{
 			this.deposit_amount = this.deposit_amount | 0;
 			this.deposit_error = false;

 			this.deposit_submit = this.deposit_id(this.deposit_amount);
 			this.deposit_submit = (this.deposit_submit).toLocaleString();
 			this.deposit_submit = this.deposit_submit.replace(',', '');
 			console.log(this.deposit_submit);
 			this.deposit_submit_string = String(this.deposit_submit);
 		}
 		else{
 			this.deposit_error = true;
 		}
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
 		console.log("num",num);
 		localStorage.setItem("deposit_id", num.toString() );

 		//num = num / 1000
 		amount=amount + num;// adding payment id
 		//amount.toFixed(3);
 		return amount
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
 }
