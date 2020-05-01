
import { take, map } from 'rxjs/operators';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetaProduct } from '../models/product';
import { ShoppingCart } from '../models/shopping-cart';


@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {

  constructor(private myshopDatabase: AngularFireDatabase) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.myshopDatabase.object('/shopping-carts/' + cartId)
      .valueChanges()
      .pipe(
        map((cart: any) => new ShoppingCart(cart.items)));
  }

  async clearCart() {
    let cartId = await this.getOrCreateCartId();
    this.myshopDatabase.object('/shopping-carts/' + cartId + '/items').remove();
  }

  private create() {
    return this.myshopDatabase.list('/shopping-carts').push({
      dateCreated: new Date().getTime()
    });
  }

  private async getOrCreateCartId(): Promise<string> { // returning the cart which is a string
    let cartId = localStorage.getItem('cartId');
    if (cartId) {
      return cartId;
    }
    let result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;
  }

  private getItem(cartId: string, productId: string) {
    return this.myshopDatabase.object('/shopping-carts/' + cartId + '/items/' + productId);
  }

  async addToCart(product: MetaProduct) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {
        // item$.update({
        //   product: product,
        //   quantity: (item.payload.val().quantity || 0) + 1
        // });
        if (item.payload.val()) {
          item$.update({
            quantity: item.payload.val().quantity + 1
          });
        } else {
          item$.set({
            title: product.value.title,
            imageUrl: product.value.imageUrl,
            price: product.value.price,
            quantity: 1
          });
        }
      });
  }

  async removeFromCart(product: MetaProduct) {
    let cartId = await this.getOrCreateCartId();
    let item$ = this.getItem(cartId, product.key);
    item$
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((item: any) => {

        let quantity = item.payload.val().quantity - 1;

        if (quantity === 0) {
          item$.remove();
        }
        else item$.update({
          quantity: quantity
        });
        

        // if (item.payload.val()) {
        //   item$.update({
        //     quantity: item.payload.val().quantity - 1
        //   });
        // } else {
        //   item$.set({
        //     title: product.value.title,
        //     imageUrl: product.value.imageUrl,
        //     price: product.value.price,
        //     quantity: 0
        //   });
        // }
      });
  }
}
