import { ProductService } from '../../../shared/services/product.service';
import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/shared/services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  categories$;
  productOrganic: any = {};
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {

    this.categories$ = this.categoryService.getCategories();

    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);

    if (this.id) {
      this.productService.get(this.id)
        .pipe(take(1))
        .subscribe((p) => {
          this.productOrganic = p
        });
    }
  }


  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      console.log('saved');
      this.productService.create(product);
    }
    // When user saves item nvigate to the products list
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete product?')) {
      return;
    }
    this.productService.delete(this.id);
    // When user saves item nvigate to the products list
    this.router.navigate(['/admin/products']);
  }

  ngOnInit() {
  }

}
