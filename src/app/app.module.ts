import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {LocalNotifications} from '@ionic-native/local-notifications/ngx';

import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { PowerManagement } from '@ionic-native/power-management/ngx';

//import { Geolocation } from '@ionic-native/geolocation';

import {Geolocation} from '@ionic-native/geolocation/ngx'; 

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    BackgroundMode,
    PowerManagement,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    LocalNotifications,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
