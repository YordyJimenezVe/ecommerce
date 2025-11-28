import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders-review-clients',
  templateUrl: './orders-review-clients.component.html',
  styleUrls: ['./orders-review-clients.component.css']
})
export class OrdersReviewClientsComponent implements OnInit {

  @Input() listReviews:any = [];
  IS_FORM:any = false;
  sale_detail:any;
  constructor() { }

  ngOnInit(): void {
  }
  changeView(sale_detail:any,value:any){
    this.IS_FORM = value;
    this.sale_detail = sale_detail;
  }

  addReview(value:any){
    console.log(value);
    this.IS_FORM = false;
    let INDEX = this.listReviews.findIndex((item:any) => item.id == value.sale_detail_id);
    this.listReviews[INDEX].review = value.review;
  }
  backView(value:any){
    this.IS_FORM = value;
  }
}
