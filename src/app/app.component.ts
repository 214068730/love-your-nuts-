import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { PowerManagement } from '@ionic-native/power-management/ngx';
import * as $ from 'jquery';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
 


  //private serverUrl = 'http://172.17.192.161:8080/socket'
  private serverUrl = 'http://172.18.109.65:8080/socket';
  private title = 'WebSockets chat';
  private stompClient;
  public latitude: any;
  public longitude: any;
  public accuracy : any;

  constructor( private platform: Platform,public router : Router
                ,private localNotification : LocalNotifications,private splashScreen: SplashScreen,
                private statusBar: StatusBar,private backgroundMode: BackgroundMode,private powerManagement: PowerManagement){
    this.initializeApp();
    this.ngOnInit();
    this.initializeWebSocketConnection();
    //this.onNotificationClick();
    //this.initializeWebSocketConnection();
    //this.sendMessage("gQom");
  }

  
 

  ngOnInit() {
    this.platform.ready().then(() => {
       if (this.platform.is('android')) {
            console.log('android');
            this.backgroundMode.enable();
            this.powerManagement.dim().then(
               res => console.log('Wakelock acquired'),
               () => {
                     console.log('Failed to acquire wakelock');
                });
            this.powerManagement.setReleaseOnPause(false).then(
            res => console.log('setReleaseOnPause successfully'),
            () => {
                console.log('Failed to set');
            });

            // this.backgroundMode.moveToBackground();
            console.log("BACKGROUND "+ this.backgroundMode.isActive());
       } else if (this.platform.is('ios')) {
            console.log('ios');
       } else {
            //fallback to browser APIs or
            console.log('The platform is not supported');
              }
     });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
     
    });
  }


  initializeWebSocketConnection(){
    var notifications  = new LocalNotifications;

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          // $(".chat").append("<div class='message'>"+message.body+"</div>");
          // console.log(message.body);
         
          notifications.schedule({
            title : "INCOMMING",
            text : "I LOVE YOU SIRAAJ",
            lockscreen: true,
            foreground: true,
            priority: 1,

            trigger :{at: new Date(new Date().getTime())}
          });

        }
      });
    });
    console.log("Socket Initialized......");
  }


  onNotificationClick(){
    this.localNotification.on('click').subscribe(()=>{
      this.router.navigate(['chat']);
    });
  }


}
