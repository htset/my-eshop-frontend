import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ItemsComponent } from './components/public/items/items.component';
import { ItemDetailsComponent } from './components/public/item-details/item-details.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterComponent } from './components/shared/filter/filter.component';
import { CartComponent } from './components/public/cart/cart.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginComponent } from './components/public/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { CheckoutComponent } from './components/public/checkout/checkout.component';
import { DeliveryAddressComponent } from './components/shared/delivery-address/delivery-address.component';
import { PaymentComponent } from './components/public/payment/payment.component';
import { SummaryComponent } from './components/public/summary/summary.component';
import { GlobalErrorHandler } from './helpers/global-error-handler';
import { ErrorDialogComponent } from './components/shared/error-dialog/error-dialog.component';
import { ErrorInterceptor } from './helpers/error-interceptor';
import { LoadingDialogComponent } from './components/shared/loading-dialog/loading-dialog.component';
import { AnalyticsDirective } from './directives/analytics.directive';
import { RegistrationComponent } from './components/public/registration/registration.component';
import { RegistrationConfirmComponent } from './components/public/registration-confirm/registration-confirm.component';
import { ForgotPasswordComponent } from './components/public/forgot-password/forgot-password.component';
import { NewPasswordComponent } from './components/public/new-password/new-password.component';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { AdminItemsComponent } from './components/admin/admin-items/admin-items.component';
import { AdminItemFormComponent } from './components/admin/admin-item-form/admin-item-form.component';


@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    ItemDetailsComponent,
    FilterComponent,
    CartComponent,
    LoginComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    CheckoutComponent,
    DeliveryAddressComponent,
    PaymentComponent,
    SummaryComponent,
    ErrorDialogComponent,
    LoadingDialogComponent,
    AnalyticsDirective,
    RegistrationComponent,
    RegistrationConfirmComponent,
    ForgotPasswordComponent,
    NewPasswordComponent,
    AdminItemsComponent,
    AdminItemFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
