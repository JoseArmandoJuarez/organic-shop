
// Determines the shape of our product object.

export interface MetaProduct {
    key: string;
    value: Product;
}

interface Product {
    title: string;
    price: number;
    category: string;
    imageUrl: string;
}
