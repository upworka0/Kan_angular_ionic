import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../../app/appSettings';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GetCategoryDetails } from '../../models/category-details';

/*
  Generated class for the OrderServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class OrderServiceProvider {

    apiUrl = AppSettings.API_ENDPOINT + 'api/order/'; 
    apiUserUrl = AppSettings.API_ENDPOINT + 'api/user/'; 
    apiUrl_merchant = AppSettings.API_ENDPOINT + 'api/merchant/'; 
    public baseURL = AppSettings.API_ENDPOINT ;

    constructor(public http: Http) {
      console.log('Hello OrderServiceProvider Provider');
    }

    //create order
    create(data): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });



      var post_params=data;

        console.log(JSON.stringify(data));
        console.log("cart_data"); 

      var link = `${this.apiUrl}create`;
      return this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());
    }
    //create order end
    getOrderDetails(orderId)
    {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });

      let usersdata = JSON.parse(localStorage.getItem('usersdata')) ;
      var post_params={
        order_id: orderId,
        token: usersdata.token
      }

      var link = `${this.apiUserUrl}get-order-ids`;
      return this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());
    }
    order_history(): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let usersdata = JSON.parse(localStorage.getItem('usersdata')) ;
      var post_params={
        token: usersdata.token
      }

      var link = `${this.apiUrl}get-user-history`;
      return this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
    
    //cancel order start :shubham 2-09-2017
    order_cancel(o_id, reason): Observable<GetCategoryDetails[]> {
     var status = "cancel";    
        
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let usersdata = JSON.parse(localStorage.getItem('usersdata')) ;
      var post_params={
        token: usersdata.token,
        status: status,
        order_id: o_id,
        reason: reason
      }
      
      console.log(JSON.stringify(post_params));

      var link = `${this.apiUrl}cancel-order`;
      return this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
    //cancel order end

    //mr92furqan 19-06-2017
    get_order_list(): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('merchantData')) ;
      var post_params={
        token: merchantData.token

      }

      var link = `${this.apiUrl}get-order-list?token=${merchantData.token}`;
      return this.http.post(link,post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
        get_order_list_merchant(): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('merchantData')) ;
      var post_params={
        token: merchantData.token

      }

      var link = `${this.apiUrl}get-order-list-merchant?token=${merchantData.token}`;
      return this.http.post(link,post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
    //mr92furqan 20-06-2017
    update_order(status,orderId): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('merchantData')) ;
      var post_params={
        token: merchantData.token,
        status:status,
        order_id: orderId,
      }

      var link = `${this.apiUrl}update-order`;
      return this.http.post(link,post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
    //mr92furqan 20-06-2017
    get_merchant_history(): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('merchantData')) ;
      var post_params={
        token: merchantData.token

      }

      var link = `${this.apiUrl}get-merchant-history`;
      return this.http.post(link,post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
    //mr92furqan 21-06-2017
    get_detail_merchant_history(orderId): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('merchantData')) ;
      var post_params={
        token: merchantData.token,
        order_id:orderId
      }

      var link = `${this.apiUrl}get-detail-merchant-history`;
      return this.http.post(link,post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }
    //mr92furqan 21-06-2017
    get_detail_user_history(orderId): Observable<GetCategoryDetails[]> {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });
      let merchantData = JSON.parse(localStorage.getItem('usersdata')) ;
      var post_params={
        token: merchantData.token,
        order_id:orderId
      }

      var link = `${this.apiUrl}get-detail-user-history`;
      return this.http.post(link,post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

    }

    rating(orderId,rating,summary)
    {
      var headers = new Headers();

      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );

      let options = new RequestOptions({ headers: headers });

      let usersdata = JSON.parse(localStorage.getItem('usersdata')) ;
      var post_params={
        order_id: orderId,
        rating: rating,
        summary: summary,
        token: usersdata.token
      }

      var link = `${this.apiUrl}rate-order`;
      return this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());
    }
  }
