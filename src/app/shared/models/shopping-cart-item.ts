
import { MetaProduct } from './product';

export class ShoppingCartItem {

    key: string;
    title: string;
    imageUrl: string;
    price: number;
    quantity: number;

    // init can be an object that looks like a ShoppingCartItem object
    constructor(init?: Partial<ShoppingCartItem>){
        Object.assign(this, init);
    }

    get totalPrice() {
        return this.price * this.quantity;
    }
}
