import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  disableButton: string;


  constructor(public router : Router) { }

  ngOnInit() {
  }

  panic(){
    
    console.log("PANIC!!!!!!!!!!!");

  }

  goToTest(){
    this.router.navigate(['chat'])
  }

}
