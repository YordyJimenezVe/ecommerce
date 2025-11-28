import { Component, OnInit } from '@angular/core';

declare var $:any;
declare function initPageEcommerce([]):any;
@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.css']
})
export class AuthProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }

}
