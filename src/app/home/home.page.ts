import { Component } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import * as $ from 'jquery';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  private serverUrl = 'http://192.168.0.94:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;
  public notifications: any;
  public isSubscribed: boolean;
  private TOPIC_NAME = 'homeTopic';

   username: string;
   student : any;
   password : string;
   response : any;



  constructor(private localNotification : LocalNotifications,public router : Router,private platform: Platform) {


    // this.ngOnInit();

    // try{
    //   this.initializeWebSocketConnection();
    // }catch(err){
    //   console.log(err);
    // }

     //this.onNotificationClick();
    
  }

 

  ngOnInit() {
    this.platform.ready().then(() => {
       if (this.platform.is('android')) {
            console.log('android');
       } else if (this.platform.is('ios')) {
            console.log('ios');
       } else {
            //fallback to browser APIs or
            console.log('The platform is not supported');
              }
     });
  }


  initializeWebSocketConnection(){
    console.log("Initializing socket......");
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function(frame) {
      that.stompClient.subscribe("/chat", (message) => {
        if(message.body) {
          $(".chat").append("<div class='message'>"+message.body+"</div>")
          console.log(message.body);
          
        }
      });
    });
    console.log("Socket Connected......");
  }

  sendMessage(){
    this.stompClient.send("/app/send/message" , {}, "Gqom");
  }

  goToTest(){
    //this.navCtrl.push(TestPage);
    this.router.navigate(['test']);
  }
  
  
  onNotificationClick(){
    this.localNotification.on('click').subscribe(()=>{
      console.log("Notification Subscribed")
      this.router.navigateByUrl("/chat");
    });
  }


  displayNotification(){
    this.localNotification.schedule({
      title : "INCOMMING",
      text : "I LOVE YOU SIRAAJ",
      lockscreen: true,
      foreground: true,
      priority: 1,

      trigger :{at: new Date(new Date().getTime())}
    });
  }

  login(){
    console.log(this.username+"     "+this.password);
    var student = {
      "studentName" : this.username,
      "studentSurname" : this.password
    }
    this.goToTest();
    //console.log("Your Response   " + result);
  }

  getMessages(){
    this.student = {
      id :[],
      studentName : [],
      studentSurname : [] 
    };

   //this.httpController.testGet().subscribe(res => console.log(res.json()));
    //this.httpController.testGet().pipe(map(res => this.student = res.json())).subscribe(res => console.log(this.student.studentName));

    //this.httpController.testGet().pipe(map(res => this.student = res.json())).subscribe(res => console.log(this.student.studentName));
    //this.httpController.testGet().subscribe(res => this.username = res.text());
  }
}
