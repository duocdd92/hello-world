import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';

import { AuthService } from './login/auth.service';
import { AuthGuardService } from './login/auth-guard.service';
import { CommonService } from './common/common-service.service';

import { AppComponent } from './app.component';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login/login.component';

@NgModule({
    declarations: [
        AppComponent,
        LayoutComponent,
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    providers: [
        AuthService,
        AuthGuardService,
        CommonService,
        HttpClient,
        { provide: LOCALE_ID, useValue: 'fr' }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor() {
        // console.log('load app module...');
    }
}
