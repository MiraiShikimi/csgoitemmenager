import { Component, OnInit } from '@angular/core';
import { appInit } from 'ngx-webstorage';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-pickuseritem',
  templateUrl: './pickuseritem.component.html',
  styleUrls: ['./pickuseritem.component.css']
})
export class PickuseritemComponent implements OnInit {

  public mylist: number[] = [1,2,3,4,5,6,7,8,9,10]

  constructor() { }

  ngOnInit(): void {
    console.log("its not reading as an angular app")
   
  }

}
