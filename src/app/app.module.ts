import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule, routingComponents} from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MaterialModule} from './material/material.module';
import { CookieService } from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AppInterceptor} from './Utilities/AppInterceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DpDatePickerModule} from 'ng2-jalali-date-picker';
import {AuthGuard} from './Guards/auth.guard';
import { NgxPermissionsModule } from 'ngx-permissions';
import { QuillModule } from 'ngx-quill'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DpDatePickerModule,
    NgxPermissionsModule.forRoot(),
    QuillModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    CookieService,
    AuthGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
