import { Component } from '@angular/core';
import { Platform,AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {TranslateService} from '@ngx-translate/core';
// import { Network } from '@ionic-native/network';
import { UserTypePage } from '../pages/user-type/user-type';
import { RegisterCustomerPage } from '../pages/register-customer/register-customer';
import { CustomerLoginPage } from '../pages/customer-login/customer-login';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { MainTabsPage } from '../pages/main-tabs/main-tabs';
import { MerchantMainTabsPage } from '../pages/merchant-main-tabs/merchant-main-tabs';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { OrderListPage } from '../pages/order-list/order-list';
import { AccountPage } from '../pages/account/account';
import firebase from 'firebase';
import { OneSignal } from '@ionic-native/onesignal';
// import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';

declare var cordova: any;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = UserTypePage;

  constructor(/*public network: Network,*/public alertCtrl: AlertController,
    platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,translate: TranslateService, private oneSignal: OneSignal) {

    platform.ready().then(() => {

      // const geoconfig: BackgroundGeolocationConfig = {
      //   desiredAccuracy: 10,
      //   stationaryRadius: 2,
      //   distanceFilter: 5,
      //   debug: true, //  enable this hear sounds for background-geolocation life-cycle.
      //   stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      // };

      // this.backgroundGeolocation.configure(geoconfig)
      // .subscribe((location: BackgroundGeolocationResponse) => {

      // // console.log(JSON.stringify(location));
      // console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
      // // IMPORTANT:  You must execute the finish method here to inform the native plugin that you're finished,
      // // and the background-task may be completed.  You must do this regardless if your HTTP request is successful or not.
      // // IF YOU DON'T, ios will CRASH YOUR APP for spending too much time in the background.
      // this.backgroundGeolocation.finish(); // FOR IOS ONLY

      // });
      
      var config = {
        apiKey: "AIzaSyBAFx3S-PK0Ma4XwsADLkyqmhMfDVMJ9ok",
        authDomain: "kangen-project-8459b.firebaseapp.com",
        databaseURL: "https://kangen-project-8459b.firebaseio.com",
        projectId: "kangen-project-8459b",
        storageBucket: "kangen-project-8459b.appspot.com",
        messagingSenderId: "554017231479"
      };
    
      firebase.initializeApp(config);
  
  
      // this.oneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
      this.oneSignal.startInit('c454ddd2-4965-41a7-b82e-e53e8f59e88b', '554017231479');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
  
      this.oneSignal.handleNotificationReceived().subscribe(jsonData => {
        console.log(JSON.stringify(jsonData));
      // do something when notification is received
      });
  
      this.oneSignal.handleNotificationOpened().subscribe(() => {
        // do something when a notification is opened
      });
  
      this.oneSignal.endInit();

      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      setTimeout(() => {
        splashScreen.hide();
      }, 100);
      //splashScreen.hide();

        this.oneSignal.getIds().then( function(data){
          // console.log(data.userId);
          localStorage.setItem('notifToken', data.userId);
        })
      
      ///////////////////////////////////////////////////////
      //
      //  Checking Wifi connection
      //
      ///////////////////////////////////////////////////////
      // if(this.network.type !== 'wifi' ){
      //   let alert = this.alertCtrl.create({
      //     title: "No Wifi Connection",
      //     subTitle: "Please connect to wifi " ,
      //     buttons: [{
      //       text: 'Ok',
      //       handler: () => {
      //         platform.exitApp();
      //         //this.rootPage = IntroPage;
      //         //this.storage.set('introShown', true);
      //       }
      //     }]
      //   });

      //   alert.present();
      // }
      // else{

        let user = localStorage.getItem('user');
        let merchant = localStorage.getItem('merchant');
        let lang = localStorage.getItem('lang');
        if(!lang)
        {
          lang = 'en';
        }
        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

         // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');

        if(user == 'true')
        {
          // localStorage.getItem('usersdata');
          let user_data=JSON.parse(localStorage.getItem('usersdata'));
          // console.log(user_data);
          let database = firebase.database();
          var dataexist: boolean = false;
          let notifToken=localStorage.getItem('notifToken');
          database.ref('/UserToken/' + user_data.id).once('value').then(function(data) {
            let token: any = null;
              if(data.val()){
                dataexist = true;
                token = data.val().token_notif;
              }
            if (!dataexist || token !== notifToken){
              database.ref('/UserToken').child(user_data.id).set({
                token_notif: notifToken,
              });
            }
            // ...
          });
          this.rootPage = MainTabsPage ;

        }else if(merchant == 'true')
        {
          let merchant_data=JSON.parse(localStorage.getItem('merchantData'));
          let database = firebase.database();
          var dataexist: boolean = false;
          let notifToken=localStorage.getItem('notifToken');
          database.ref('/MerchantToken/' + merchant_data.id).once('value').then(function(data) {
            let token: any = null;
              if(data.val()){
                dataexist = true;
                token = data.val().token_notif;
              }
            if (!dataexist || token !== notifToken){
              database.ref('/MerchantToken').child(merchant_data.id).set({
                token_notif: notifToken,
              });
            }
            // ...
          });
          this.rootPage = MerchantMainTabsPage ;
        }
      // }


      
    });
  }
}

