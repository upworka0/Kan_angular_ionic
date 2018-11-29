import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../../app/appSettings';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { GetAllPh } from '../../models/ph-details';

/*
  Generated class for the PhServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PhServiceProvider {

    
    apiUrl = AppSettings.API_ENDPOINT + 'api/ph/all'; 
    
    public baseURL = AppSettings.API_ENDPOINT ;
    
  constructor(public http: Http) {
    console.log('Hello PhServiceProvider Provider');
  }

    //get all ph starts
    GetAllPh(): Observable<GetAllPh[]> {
        
        
      var headers = new Headers();
      
      headers.append("Access-Control-Allow-Origin", '*');
      headers.append("Access-Control-Allow-Methods", 'POST, GET');
      headers.append("Accept", 'application/json');
      headers.append('Content-Type', 'application/json' );
      
      let options = new RequestOptions({ headers: headers });
      
      
      var link = `${this.apiUrl}`; 

      //var link = this.apiUrl
      
    var resp = this.http.get(link)
      .map(res => res.json());
        //.map(res => <GetAllPh[]>res.json());

    console.log(JSON.stringify(resp)); 
    return resp;
    }
    //get all ph end
    
   

}
