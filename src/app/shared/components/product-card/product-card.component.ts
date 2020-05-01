import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Component, Input } from '@angular/core';
import { MetaProduct } from '../../models/product';
import { ShoppingCart } from '../../models/shopping-cart';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  // Decorator
  @Input('producto') product: MetaProduct;

  @Input('show-actions') showActions = true;

  @Input('shopping-cart') shoppingCart: ShoppingCart;


  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}




// componentId = this.uuidv4();
  // uuidv4() {
  //   const r = Math.random().toString(36).substring(4);
  //   return r.toString();
  // }