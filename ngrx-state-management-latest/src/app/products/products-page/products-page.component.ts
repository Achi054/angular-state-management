import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { selectProductShowCode, selectProducts, selectProductsError, selectProductsLoading, selectTotalProducts } from '../state/produts.selectors';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.css'],
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectTotalProducts);
  loading$ = this.store.select(selectProductsLoading);
  showProductCode$ = this.store.select(selectProductShowCode);
  errorMessage$ = this.store.select(selectProductsError);

  constructor(
    private store: Store
  ) {
    this.store.subscribe(store => console.log(store));
  }

  ngOnInit() {
    this.store.dispatch(ProductsPageActions.loadProducts())
  }

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductsCode());
  }
}
