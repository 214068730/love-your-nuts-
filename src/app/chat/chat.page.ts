import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  //private serverUrl = 'http://172.17.192.161:8080/socket'
  private serverUrl = 'http://172.18.109.65:8080/socket';
  private title = 'WebSockets chat';
  private stompClient;
  public latitude: any;
  public longitude: any;
  public accuracy : any;
  constructor(public router : Router,private localNotification : LocalNotifications,private geolocation: Geolocation) { 
    
    this.ngOnInit();
    
      try{
        this.initializeWebSocketConnection();
      }catch(err){
        console.log("Constructor" + err);
      }
      this.onNotificationClick();
  }

  ngOnInit() {
  }

  navigate(){
    //this.navCtrl.push(TestPage);
    this.router.navigate(['test']);
  }


 
  initializeWebSocketConnection(){
    var notifications  = new LocalNotifications;

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>");
          console.log(message.body);
         
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

  sendMessage(){
    console.log("Sending data to web socket...");

    let options = {
      timeout:10000,
      enableHighAccuracy:true
    };

    this.geolocation.getCurrentPosition(options).then((resp) => {
     
      this.latitude = resp.coords.latitude;
      this.longitude =  resp.coords.longitude;
    
      console.log(this.latitude + "/" + this.longitude);
     }).catch((error) => {
       console.log('Error getting location', error);
     });

    this.stompClient.send("/app/send/message" , {}, "Gqom");
  }

  

  displayNotification(notifications:LocalNotifications){
    // notifications.schedule({
    //   title : "INCOMMING",
    //   text : "I LOVE YOU SIRAAJ",
    //   lockscreen: true,
    //   foreground: true,
    //   priority: 1,

    //   trigger :{at: new Date(new Date().getTime())}
    // });
    console.log("TESTING" + notifications);
  }


  onNotificationClick(){
    this.localNotification.on('click').subscribe(()=>{
      this.router.navigate(['chat']);
    });
  }
}
