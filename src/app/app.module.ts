import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
 import { NgxIndexedDB } from 'ngx-indexed-db';
 import {NgxPaginationModule} from 'ngx-pagination';
 import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
 import { TimezonePickerModule } from 'ng2-timezone-selector';
 //import { ICountry, IState, ICity } from 'country-state-city'

//import { NgxIndexedDBService } from 'ngx-indexed-db';
//import { DbConfigService } from './dbConfig.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LocationManagementComponent } from './location-management/location-management.component';

@NgModule({
  declarations: [
    AppComponent,
    LocationManagementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule, 
    NgMultiSelectDropDownModule,
    TimezonePickerModule
    //NgxIndexedDB
  ],
  providers: [{provide:NgxIndexedDB}],
  bootstrap: [AppComponent]
})
export class AppModule { }
