import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductsService } from "../products.service";
import { Injectable } from "@angular/core";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { catchError, concatMap, map, of } from "rxjs";

@Injectable()
export class ProductEffects {
    constructor(
        private action$: Actions,
        private productsService: ProductsService) { }

    loadProducts$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductsPageActions.loadProducts),
            concatMap(() =>
                this.productsService
                    .getAll()
                    .pipe(
                        map((products) =>
                            ProductsAPIActions.productsLoadedSuccess({ products })
                        ),
                        catchError(error => of(ProductsAPIActions.productsLoadedFail({message: error})))
                    )
            )
        )
    );

    addProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductsPageActions.addProduct),
            concatMap(({ product }) =>
                this.productsService
                    .add(product)
                    .pipe(
                        map((newProduct) =>
                            ProductsAPIActions.productsAddedSuccess({ product: newProduct })
                        ),
                        catchError(error => of(ProductsAPIActions.productsAddedFail({message: error})))
                    )
            )
        )
    );

    updateProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductsPageActions.updateProduct),
            concatMap(({ product }) =>
                this.productsService
                    .update(product)
                    .pipe(
                        map((product) =>
                            ProductsAPIActions.productsUpdatedSuccess({ product })
                        ),
                        catchError(error => of(ProductsAPIActions.productsUpdatedFail({message: error})))
                    )
            )
        )
    );

    deleteProduct$ = createEffect(() =>
        this.action$.pipe(
            ofType(ProductsPageActions.deleteProduct),
            concatMap(({ id }) =>
                this.productsService
                    .delete(id)
                    .pipe(
                        map((product) =>
                            ProductsAPIActions.productsDeletedSuccess({ id })
                        ),
                        catchError(error => of(ProductsAPIActions.productsDeletedFail({message: error})))
                    )
            )
        )
    );
}