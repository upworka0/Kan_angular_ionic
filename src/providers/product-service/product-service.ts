import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../../app/appSettings';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { GetCategoryDetails } from '../../models/category-details';

/*
  Generated class for the ProductServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
    */
  @Injectable()
  export class ProductServiceProvider {

    apiUrl = AppSettings.API_ENDPOINT + 'api/product/'; 
    
    public baseURL = AppSettings.API_ENDPOINT ;

    

    public categoryId;
    constructor(public http: Http) {
      console.log('Hello ProductServiceProvider Provider');
    }
    
    //get Category details starts
    GetCategoryDetails(): Observable<GetCategoryDetails[]> {
      var headers = new Headers();
      
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );
      
      let options = new RequestOptions({ headers: headers });
      
      
      var post_params={}
      
      var link = `${this.apiUrl}get-all-products`;
      
       var resp = this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());

        return resp;
    }
    //get Category details end
    GetBanners(): Observable<GetCategoryDetails[]> {
      var headers = new Headers();
      
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/x-www-form-urlencoded' );
      
      let options = new RequestOptions({ headers: headers });
      
      
      var post_params={}
      
      var link = `${this.apiUrl}get-all-banners`;
      return this.http.post(link, post_params, options)
      .map(res => <GetCategoryDetails[]>res.json());
    }
  }
