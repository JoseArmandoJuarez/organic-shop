
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.css']
})
export class ShoppingCartSummaryComponent implements OnInit {

  @Input('cart') cart: any;

  constructor() { }

  ngOnInit() {
    this.cart = this.cart || {};
  }

}
