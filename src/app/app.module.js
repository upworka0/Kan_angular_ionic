var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps } from '@ionic-native/google-maps';
import { NativeStorage } from '@ionic-native/native-storage';
import { AccordionModule } from "ng2-accordion";
import { MyApp } from './app.component';
import { UserTypePage } from '../pages/user-type/user-type';
import { RegisterCustomerPage } from '../pages/register-customer/register-customer';
import { CustomerLoginPage } from '../pages/customer-login/customer-login';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { MainTabsPage } from '../pages/main-tabs/main-tabs';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { OrderListPage } from '../pages/order-list/order-list';
import { AccountPage } from '../pages/account/account';
import { OrderConfirmationPage } from '../pages/order-confirmation/order-confirmation';
import { SearchMerchantPage } from '../pages/search-merchant/search-merchant';
import { MerchantDetailsPage } from '../pages/merchant-details/merchant-details';
import { RateMerchantPage } from '../pages/rate-merchant/rate-merchant';
import { OnprocessOrderDetailsPage } from '../pages/onprocess-order-details/onprocess-order-details';
import { FinishedOrderDetailsPage } from '../pages/finished-order-details/finished-order-details';
import { MerchantLoginPage } from '../pages/merchant-login/merchant-login';
import { MerchantHomePage } from '../pages/merchant-home/merchant-home';
import { MerchantMainTabsPage } from '../pages/merchant-main-tabs/merchant-main-tabs';
import { MerchantOrderListPage } from '../pages/merchant-order-list/merchant-order-list';
import { MerchantDepositsPage } from '../pages/merchant-deposits/merchant-deposits';
import { MerchantAccountPage } from '../pages/merchant-account/merchant-account';
import { MerchantFinishedOrderDetailsPage } from '../pages/merchant-finished-order-details/merchant-finished-order-details';
import { MerchantDepositBalancePage } from '../pages/merchant-deposit-balance/merchant-deposit-balance';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { ProductServiceProvider } from '../providers/product-service/product-service';
import { CartServiceProvider } from '../providers/cart-service/cart-service';
import { OrderServiceProvider } from '../providers/order-service/order-service';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
        declarations: [
            MyApp,
            UserTypePage,
            RegisterCustomerPage,
            CustomerLoginPage,
            ForgetPasswordPage,
            MainTabsPage,
            HomePage,
            CartPage,
            OrderListPage,
            AccountPage,
            OrderConfirmationPage,
            SearchMerchantPage,
            MerchantDetailsPage,
            RateMerchantPage,
            OnprocessOrderDetailsPage,
            FinishedOrderDetailsPage,
            MerchantLoginPage,
            MerchantHomePage,
            MerchantMainTabsPage,
            MerchantOrderListPage,
            MerchantDepositsPage,
            MerchantAccountPage,
            MerchantFinishedOrderDetailsPage,
            MerchantDepositBalancePage
        ],
        imports: [
            BrowserModule,
            HttpModule,
            AccordionModule,
            IonicModule.forRoot(MyApp, { tabsPlacement: 'top' })
        ],
        bootstrap: [IonicApp],
        entryComponents: [
            MyApp,
            UserTypePage,
            RegisterCustomerPage,
            CustomerLoginPage,
            ForgetPasswordPage,
            MainTabsPage,
            HomePage,
            CartPage,
            OrderListPage,
            AccountPage,
            OrderConfirmationPage,
            SearchMerchantPage,
            MerchantDetailsPage,
            RateMerchantPage,
            OnprocessOrderDetailsPage,
            FinishedOrderDetailsPage,
            MerchantLoginPage,
            MerchantHomePage,
            MerchantMainTabsPage,
            MerchantOrderListPage,
            MerchantDepositsPage,
            MerchantAccountPage,
            MerchantFinishedOrderDetailsPage,
            MerchantDepositBalancePage
        ],
        providers: [
            StatusBar,
            NativeStorage,
            SplashScreen,
            Geolocation,
            GoogleMaps,
            { provide: ErrorHandler, useClass: IonicErrorHandler },
            AuthServiceProvider,
            ProductServiceProvider,
            CartServiceProvider,
            OrderServiceProvider,
            OrderServiceProvider
        ]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map