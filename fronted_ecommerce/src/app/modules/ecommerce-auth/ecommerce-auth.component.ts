import { Component, OnInit } from '@angular/core';

declare var $:any;
declare function initPageEcommerce([]):any;

@Component({
  selector: 'app-ecommerce-auth',
  templateUrl: './ecommerce-auth.component.html',
  styleUrls: ['./ecommerce-auth.component.css']
})
export class EcommerceAuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      initPageEcommerce($);
    }, 50);
  }

}
