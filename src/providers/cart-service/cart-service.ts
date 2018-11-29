import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { AppSettings } from '../../app/appSettings';
import 'rxjs/add/operator/map';

/*
  Generated class for the CartServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
  	*/
  @Injectable()
  export class CartServiceProvider {

    apiUrl = AppSettings.API_ENDPOINT + 'api/order/';     
    public baseURL = AppSettings.API_ENDPOINT ;

    public cart;
    public order;
    public total_price;
    public cart_items;
    public grand_total;
    public cart_index;
    public payment_id;
    constructor(public http: Http) {
      this.grand_total=0;	
      let already_cart = localStorage.getItem("is_cart");

      if (already_cart=="true") {
        let payment_id = localStorage.getItem("payment_id");
        let payment_num = Number(payment_id) /1000;
        this.payment_id = payment_id;
        this.order = JSON.parse(localStorage.getItem("cart"));
        this.cart_items=this.order.order_details.length;
        let length = this.order.order_details.length;
        length = length -1;
        this.grand_total =this.grand_total //+ payment_num

        for (let j=0; j<= length;j++)
        {
          this.grand_total=this.grand_total+this.order.order_details[j].subtotal;
        }

      }
      else{
        let num = Math.floor(Math.random() * 900) + 100;
        localStorage.setItem("payment_id", num.toString() );
        this.payment_id = num;
        num = num / 1000
        this.cart_items=0;
        this.grand_total=0.00 //+ num;// adding payment id
      }

      console.log('Hello CartServiceProvider Provider');
    }
    removeProductCart(product,qty){
      
      if(this.order!=undefined && this.order.order_details!=undefined)
      {
        let length = this.order.order_details.length;
        length = length -1;
        for (let j=0; j<=length;j++)
        {
         
          if(this.order.order_details[j].product_id === product.id)
          {
            
            this.grand_total=this.grand_total-parseInt(this.order.order_details[j].subtotal);
             console.log("before splice",this.order) 
            this.order.order_details.splice(j, 1);
             console.log("after splice",this.order) 

            this.cart_items =  this.cart_items -1;
            length = length-1;
          }
        }
        localStorage.setItem("cart", JSON.stringify(this.order));
      }
    }
    removeProductCart_confirm(product,qty){
     
     
      if(this.order!=undefined && this.order.order_details!=undefined)
      {
        let length = this.order.order_details.length;
        length = length -1;
        for (let j=0; j<=length;j++)
        {
          console.log("this.order.order_details[j].product_id " + this.order.order_details[j].product_id + " : product.id :"+ product.id);
          
          if(this.order.order_details[j].product_id == product.product_id)
          {
            
            this.grand_total=this.grand_total-parseInt(this.order.order_details[j].subtotal);
             console.log("before splice",this.order) 
            this.order.order_details.splice(j, 1);
             console.log("after splice",this.order) 

            this.cart_items =  this.cart_items -1;
            length = length-1;
          }
        }
        localStorage.setItem("cart", JSON.stringify(this.order));
      }
    }
    addProductCart(product,qty, ph){

      let is_already_cart_item=0;
      let already_cart = localStorage.getItem("is_cart");
      if (already_cart=="true") {
        console.log("here cart already_cart");

        this.order = JSON.parse(localStorage.getItem("cart"));
      }
      else{
        console.log("here cart else of already_cart");

        this.order = {
          "merchant_id" :'',
          "origin": '',
          "lat_origin": '',
          "lng_origin": '',
          "destination": '',
          "lat_destination": '',
          "lng_destination": '',
          "route_polyline": '',
          "payment_id": '',
          "order_type": 'product',
          "distance" : '',
          "estimate_time": '',
        }
      }

      let details = {
        "product_id":product.id,
        "name" :product.name,
        "price" : product.price,
        "qty":qty,
        "ph_id": ph,
        "subtotal" : product.price*qty
      };
      if(this.order.order_details==undefined )
      {
        console.log("here   order_details==undefined");

        this.order.order_details = [
        {
          "product_id":product.id,
          "name" :product.name,
          "price" : product.price,
          "qty":qty,
          "ph_id": ph,
          "subtotal" : product.price*qty		
        }
        ];
        this.grand_total= this.grand_total + (product.price*qty);

      }
      else{
        console.log("here else of  order_details==undefined");

        var i=0;
        if(this.order.order_details!=undefined)
        {
          let length = this.order.order_details.length;
          length = length -1;

          for (let j=0; j<=length;j++)
          {
            if(this.order.order_details[j].product_id === product.id && qty!=this.order.order_details[j].qty)
            {
              is_already_cart_item=1; 
              this.grand_total=this.grand_total-parseInt(this.order.order_details[j].subtotal);
              this.order.order_details[j].qty = qty;
              this.order.order_details[j].subtotal = product.price*qty  ;
              this.grand_total=this.grand_total+parseInt(this.order.order_details[j].subtotal);

            }
          }
        }
        if(is_already_cart_item==0){
          console.log("here else of  if(is_already_cart_item==0){");

          this.order.order_details.push(details);
          let length = this.order.order_details.length;
          length = length -1;
          this.grand_total=0;
          for (let j=0; j<= length;j++)
          {
            console.log("here else of  for grant total");
            this.grand_total=this.grand_total+parseInt(this.order.order_details[j].subtotal);
          }
        }
      }
      this.cart = this.order;
      localStorage.setItem("cart", JSON.stringify(this.order));
      localStorage.setItem("is_cart", "true");
      this.cart_items=this.order.order_details.length;
      console.log(this.cart);
    }

    // Update Cart //
    update_quantity_item(product,qty){
      this.order = JSON.parse(localStorage.getItem("cart"));
      let details = {
        "product_id":product.product_id,
        "name" :product.name,
        "price" : product.price,
        "qty":qty,
        "subtotal" : product.price*qty
      };
      console.log(details);
      var i=0;
      this.cart_index=-1;	
      let length = this.order.order_details.length;
      length = length -1;
      for (let j=0; j<=length;j++)
      {
        if(this.order.order_details[j].product_id === product.product_id){
          this.cart_index=j;				
        }
      }
      if(this.cart_index>-1){
        //this.order.order_details.splice(this.cart_index, 1);
        this.order.order_details[this.cart_index]=details;
        //this.order.order_details.push(details);
      }
      let items = this.order.order_details.length;
      this.grand_total=0 //+ (this.payment_id / 1000); // adding payment id
      //this.grand_total.toFixed(3);
      items = items -1;
      for (let j=0; j<= items;j++)
      {
        this.grand_total=this.grand_total+parseInt(this.order.order_details[j].subtotal);
        //	this.grand_total.toFixed(3);
      }
      localStorage.setItem("cart", JSON.stringify(this.order));
      console.log(this.order);
    }
    addCartAddress(address,lat,lng)
    { 
      console.log("address:-" , address);
      console.log("lat:-" , lat);
      console.log("lng:-" , lng);
      let already_cart = localStorage.getItem("is_cart");
      this.order = JSON.parse(localStorage.getItem("cart"));
      if (already_cart=="true") {
        this.order.destination = address;
        this.order.lat_destination = lat;
        this.order.lng_destination = lng;
        console.log("updating location");
        localStorage.setItem('message','Destination Address saved.');
        localStorage.setItem("cart", JSON.stringify(this.order));

      }
      else{
        localStorage.setItem('message','Your Cart is empty');
      }
      console.log(this.order);
    }
    remove_cart(){
      this.cart_items=0;
      this.grand_total=0;
    }
  }
