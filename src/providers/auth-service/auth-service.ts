import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { AppSettings } from '../../app/appSettings';
import 'rxjs/add/operator/map';

import { OneSignal } from '@ionic-native/onesignal';


import { User } from '../../models/user';


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class AuthServiceProvider {


    apiUrl = AppSettings.API_ENDPOINT + 'api/user/'; 
    mailUrl = AppSettings.API_ENDPOINT + 'mail.php'; 
    apiUrl_merchant = AppSettings.API_ENDPOINT + 'api/merchant/'; 
    public baseURL = AppSettings.API_ENDPOINT ;

    constructor(public http: Http, private oneSignal: OneSignal) {

      console.log('Hello AuthServiceProvider Provider');
    }

    register(post_data): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );	

      let options = new RequestOptions({ headers: headers });
      var post_params={
        name: post_data.name,
        email: post_data.email,
        password: post_data.password,
        phone: post_data.phone,
        area_code: post_data.area_code
      }
      var link = `${this.apiUrl}register`;
      var data = post_data;/*JSON.stringify({post_data});*/

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    
    login(post_data): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );	

      let options = new RequestOptions({ headers: headers });
      var post_params={
        name: post_data.name,
        email: post_data.email,
        password: post_data.password,
        phone: post_data.phone,
        area_code: post_data.area_code
      }
      var link = `${this.apiUrl}login`;
      var data = post_data;
      console.log(JSON.stringify(post_params));
      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    forget_pass(post_data): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      var post_params={
        
        email: post_data.email
       
      }
      var link = `${this.mailUrl}?email=`+post_params.email;
      var data = post_data;
      console.log(post_params);
      return this.http.get(link,  options)
      .map(res => <User[]>res.json());
    }
    get_account(): Observable<User[]> {
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );	

      let options = new RequestOptions({ headers: headers });
      let userdata=JSON.parse(localStorage.getItem('usersdata'));
      var post_params={
        token : userdata.token
      }
      var link = `${this.apiUrl}profile`;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());

    }
    update_account(post_data): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );	

      let options = new RequestOptions({ headers: headers });
      let userdata=JSON.parse(localStorage.getItem('usersdata'));
      var post_params={
        token : userdata.token,
        name: post_data.name,
        email: post_data.email,
        phone: post_data.phone
      }
      var link = `${this.apiUrl}profile/edit`;
      var data = post_data;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }

    update_password(post_data): Observable<User[]> {
      console.log(post_data);
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );	

      let options = new RequestOptions({ headers: headers });
      let userdata=JSON.parse(localStorage.getItem('usersdata'));
      var post_params={
        token : userdata.token,
        old_password: post_data.old_password,
        new_password: post_data.new_password,
        confirm_password: post_data.confirm_password
      }
      var link = `${this.apiUrl}reset-pass`;
      var data = post_data;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }

    //mr92furqan 19-06-2017
    login_merchant(post_data): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      var post_params={

        email: post_data.email,
        password: post_data.password,
        
      }
      console.log(this.apiUrl_merchant);
      var link = `${this.apiUrl_merchant}login`;
      var data = post_data;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    //endof login_merchant

    getMerchantNear(post_data): Observable<User[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });


      var post_params={
        token: post_data.token,
        latitude: post_data.latitude,
        longitude: post_data.longitude
      }

      var link = `${this.apiUrl}near-merchant`;
      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }

    profile_merchant(): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('merchantData')) ;
      var post_params={
        token: merchantData.token,
        
      }
      console.log(this.apiUrl_merchant);
      var link = `${this.apiUrl_merchant}profile`;
      

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }

    update_merchantAccount(post_data): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token,
        name: post_data.name,
        email: post_data.email,
        phone: post_data.phone
      }
      var link = `${this.apiUrl_merchant}edit`;
      var data = post_data;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }

    update_merchantPassword(post_data): Observable<User[]> {
      console.log(post_data);
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token,
        old_password: post_data.old_password,
        new_password: post_data.new_password,
        confirm_password: post_data.confirm_password
      }
      var link = `${this.apiUrl_merchant}reset-pass`;
      var data = post_data;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    get_deposit_settings(): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token,
        
      }
      var link = `${this.apiUrl_merchant}get-deposit-settings`;
      

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }

    deposit_amount(post_data): Observable<User[]> {
      console.log(post_data)
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token,
        amount : post_data.amount,
        code : post_data.code,
        no_deposit : post_data.no_deposit
        
      }
      var link = `${this.apiUrl_merchant}deposit-amount`;
      

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    deposit_amount_monthly(post_data): Observable<User[]> {
      console.log(post_data)
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token,
        amount : post_data.amount,
        code : post_data.code,
        no_deposit : post_data.no_deposit
        
      }
      var link = `${this.apiUrl_merchant}monthlydeposit-amount`;
      

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    get_deposits(): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token
      }
      var link = `${this.apiUrl_merchant}get-deposits`;
      

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    get_deposits_monthly(): Observable<User[]> {

      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token
      }
      var link = `${this.apiUrl_merchant}get-monthlydeposit`;
      

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());
    }
    logout(): Observable<User[]> {
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let userdata=JSON.parse(localStorage.getItem('usersdata'));
      var post_params={
        token : userdata.token
      }
      var link = `${this.apiUrl}logout`;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());

    }
    logout_merchant(): Observable<User[]> {
      var headers = new Headers();
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );  

      let options = new RequestOptions({ headers: headers });
      let merchantData=JSON.parse(localStorage.getItem('merchantData'));
      var post_params={
        token : merchantData.token
      }
      var link = `${this.apiUrl_merchant}logout`;

      return this.http.post(link, post_params, options)
      .map(res => <User[]>res.json());

    }
  }
