import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeStorage } from '@ionic-native/native-storage';
import {AccordionModule} from "ngx-accordion";


import { MyApp } from './app.component';
import { UserTypePageModule } from '../pages/user-type/user-type.module';
import { RegisterCustomerPageModule } from '../pages/register-customer/register-customer.module';
import { CustomerLoginPageModule } from '../pages/customer-login/customer-login.module';
import { ForgetPasswordPageModule } from '../pages/forget-password/forget-password.module';
import { MainTabsPageModule } from '../pages/main-tabs/main-tabs.module';
import { HomePageModule } from '../pages/home/home.module';
import { CartPageModule } from '../pages/cart/cart.module';
import { OrderListPageModule } from '../pages/order-list/order-list.module';
import { AccountPageModule } from '../pages/account/account.module';
import { OrderConfirmationPageModule } from '../pages/order-confirmation/order-confirmation.module';
import { SearchMerchantPageModule } from '../pages/search-merchant/search-merchant.module';
import { MerchantDetailsPageModule } from '../pages/merchant-details/merchant-details.module';
import { RateMerchantPageModule } from '../pages/rate-merchant/rate-merchant.module';
import { OnprocessOrderDetailsPageModule } from '../pages/onprocess-order-details/onprocess-order-details.module';
import { FinishedOrderDetailsPageModule } from '../pages/finished-order-details/finished-order-details.module';
import { MerchantLoginPageModule } from '../pages/merchant-login/merchant-login.module';
import { MerchantHomePageModule } from '../pages/merchant-home/merchant-home.module';
import { MerchantMainTabsPageModule } from '../pages/merchant-main-tabs/merchant-main-tabs.module';
import { MerchantOrderListPageModule } from '../pages/merchant-order-list/merchant-order-list.module';
import { MerchantDepositsPageModule } from '../pages/merchant-deposits/merchant-deposits.module';
import { MerchantAccountPageModule } from '../pages/merchant-account/merchant-account.module';
import { MerchantCashPageModule } from '../pages/merchant-cash/merchant-cash.module';
import { MerchantFinishedOrderDetailsPageModule } from '../pages/merchant-finished-order-details/merchant-finished-order-details.module';
import { MerchantDepositBalancePageModule } from '../pages/merchant-deposit-balance/merchant-deposit-balance.module';

// import { UserTypePage } from '../pages/user-type/user-type';
// import { RegisterCustomerPage } from '../pages/register-customer/register-customer';
// import { CustomerLoginPage } from '../pages/customer-login/customer-login';
// import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
// import { MainTabsPage } from '../pages/main-tabs/main-tabs';
// import { HomePage } from '../pages/home/home';
// import { CartPage } from '../pages/cart/cart';
// import { OrderListPage } from '../pages/order-list/order-list';
// import { AccountPage } from '../pages/account/account';
// import { OrderConfirmationPage } from '../pages/order-confirmation/order-confirmation';
// import { SearchMerchantPage } from '../pages/search-merchant/search-merchant';
// import { MerchantDetailsPage } from '../pages/merchant-details/merchant-details';
// import { RateMerchantPage } from '../pages/rate-merchant/rate-merchant';
// import { OnprocessOrderDetailsPage } from '../pages/onprocess-order-details/onprocess-order-details';
// import { FinishedOrderDetailsPage } from '../pages/finished-order-details/finished-order-details';
// import { MerchantLoginPage } from '../pages/merchant-login/merchant-login';
// import { MerchantHomePage } from '../pages/merchant-home/merchant-home';
// import { MerchantMainTabsPage } from '../pages/merchant-main-tabs/merchant-main-tabs';
// import { MerchantOrderListPage } from '../pages/merchant-order-list/merchant-order-list';
// import { MerchantDepositsPage } from '../pages/merchant-deposits/merchant-deposits';
// import { MerchantAccountPage } from '../pages/merchant-account/merchant-account';
// import { MerchantCashPage } from '../pages/merchant-cash/merchant-cash';
// import { MerchantFinishedOrderDetailsPage } from '../pages/merchant-finished-order-details/merchant-finished-order-details';
// import { MerchantDepositBalancePage } from '../pages/merchant-deposit-balance/merchant-deposit-balance';
// Import ionic2-rating module
import { Ionic2RatingModule } from 'ionic2-rating';
// import { Network } from '@ionic-native/network';
// import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { CartServiceProvider } from '../providers/cart-service/cart-service';
import { OrderServiceProvider } from '../providers/order-service/order-service';
// import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import {OneSignal} from '@ionic-native/onesignal';
import { LocationProvider } from '../providers/location/location';
import { PhServiceProvider } from '../providers/ph-service/ph-service';

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}


@NgModule({
    declarations: [
    MyApp,
    ],
    imports: [
    BrowserModule,
    UserTypePageModule,
    RegisterCustomerPageModule,
    CustomerLoginPageModule,
    ForgetPasswordPageModule,
    MainTabsPageModule,
    HomePageModule,
    CartPageModule,
    OrderListPageModule,
    AccountPageModule,
    OrderConfirmationPageModule,
    SearchMerchantPageModule,
    MerchantDetailsPageModule,
    RateMerchantPageModule,
    OnprocessOrderDetailsPageModule,
    FinishedOrderDetailsPageModule,
    MerchantLoginPageModule,
    MerchantHomePageModule,
    MerchantMainTabsPageModule,
    MerchantOrderListPageModule,
    MerchantDepositsPageModule,
    MerchantAccountPageModule,
    MerchantCashPageModule,
    MerchantFinishedOrderDetailsPageModule,
    MerchantDepositBalancePageModule,
    
    AccordionModule,
    IonicModule.forRoot(MyApp, {tabsPlacement: 'top'}),
    Ionic2RatingModule,
    HttpModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (createTranslateLoader),
            deps: [Http]
        }
    }),

    ],
    bootstrap: [IonicApp],
    entryComponents: [
    MyApp,
    // UserTypePage,
    // RegisterCustomerPage,
    // CustomerLoginPage,
    // ForgetPasswordPage,
    // MainTabsPage,
    // HomePage,
    // CartPage,
    // OrderListPage,
    // AccountPage,
    // OrderConfirmationPage,
    // SearchMerchantPage,
    // MerchantDetailsPage,
    // RateMerchantPage,
    // OnprocessOrderDetailsPage,
    // FinishedOrderDetailsPage,
    // MerchantLoginPage,
    // MerchantHomePage,
    // MerchantMainTabsPage,
    // MerchantOrderListPage,
    // MerchantDepositsPage,
    // MerchantAccountPage,
    // MerchantCashPage,
    // MerchantFinishedOrderDetailsPage,
    // MerchantDepositBalancePage
    ],
    providers: [
    OneSignal,
    // BackgroundGeolocation,
    StatusBar,
    NativeStorage,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    ProductServiceProvider,
    CartServiceProvider,
    OrderServiceProvider,
    LocationProvider,
    PhServiceProvider,
    // Network
    ]
    

})
export class AppModule {}
