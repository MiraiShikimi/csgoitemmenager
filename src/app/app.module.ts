import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import {NgxWebstorageModule} from 'ngx-webstorage';
import { ToastrModule } from 'ngx-toastr';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TokenInterceptor } from './token-intercepter';
import { UserItemsComponent } from './user-items/user-items.component';
import { PickuseritemComponent } from './pickuseritem/pickuseritem.component';
import { UserInventoryValuesComponent } from './user-inventory-values/user-inventory-values.component';
import { HomescreenComponent } from './homescreen/homescreen.component';
import { ManageitemsComponent } from './manageitems/manageitems.component';
import { ItemscontrollComponent } from './itemscontroll/itemscontroll.component';
import { FilterPipe } from './pipes/filter.pipe';
import { AddItemsFilterPipe } from './pipes/add-items-filter.pipe';
import { ItemsControlPipe } from './pipes/items-control.pipe';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';
import { ProfilePageComponent } from './profile-page/profile-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserItemsComponent,
    PickuseritemComponent,
    UserInventoryValuesComponent,
    HomescreenComponent,
    ManageitemsComponent,
    ItemscontrollComponent,
    FilterPipe,
    AddItemsFilterPipe,
    ItemsControlPipe,
    ProfilePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    FontAwesomeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule

    

    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
