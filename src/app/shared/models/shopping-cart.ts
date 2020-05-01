import { MetaProduct } from './product';
import { ShoppingCartItem } from './shopping-cart-item';

export class ShoppingCart {
    items: ShoppingCartItem[] = [];

    //item is an object
    constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
        this.itemsMap = itemsMap || {};
        //iterating tru all the products in itemsMap
        for (let productId in itemsMap) {
            let item = itemsMap[productId];
            this.items.push(new ShoppingCartItem({
                ...item, // the 3 dots will iterate over all the properties of the object and add them here in ...item
                key: productId
            }));
        }
    }


    getQuantity(product: MetaProduct) {
        // console.log("product: ", product)
        // passing the key to let item from the button that was clicked
        let item = this.itemsMap[product.key];
        return item ? item.quantity : 0; // if theres an item return the quantaty else 0
    }

    get totalPrice() {
        let sum = 0;
        for (let productId in this.items) {
            sum += this.items[productId].totalPrice;
        }
        return sum;
    }

    get totalItemsCount() {
        let count = 0;

        // looping tru the products id in cart items
        for (let productId in this.itemsMap) {
            count += this.itemsMap[productId].quantity;
        }
        return count;
    }

}
