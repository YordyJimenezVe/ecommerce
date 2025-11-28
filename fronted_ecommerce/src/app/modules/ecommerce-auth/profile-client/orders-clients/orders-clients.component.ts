import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-clients',
  templateUrl: './orders-clients.component.html',
  styleUrls: ['./orders-clients.component.css']
})
export class OrdersClientsComponent implements OnInit {

  @Input() listOrders:any = [];
  constructor() { }

  ngOnInit(): void {

    console.log(this.listOrders);
  }

}
