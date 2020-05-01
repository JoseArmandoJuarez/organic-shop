
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MetaProduct } from 'src/app/shared/models/product';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  products: MetaProduct[];
  filteredProducts: MetaProduct[];
  subscription: Subscription;

  sortedData: MetaProduct[];


  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(p => {
        this.filteredProducts = this.products =

          //
          // here I map my firebase  products to my interface metaproduct as a collection/list MetaProduct[]
          //
          p.map(product => {
            // console.log(product);
            return { key: product.$key, value: product.$value } as MetaProduct;
          });
        // this.initializeTable(this.products);
      });

  }


  filter(query: string) {

    // console.log(query);
    // console.log(this.products);
    // console.log(this.products[0].$value);

    // if (query) { // if somebody has typed something, meaning query is not null or empty
    //   this.filteredProducts = this.products.filter(p => p.$value.title.toLowerCase().includes(query.toLowerCase()));
    // }
    // else {
    //   this.filteredProducts = this.products;
    // }

    this.filteredProducts = (query) ?
      this.products.filter(p => p.value.title.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }


}
