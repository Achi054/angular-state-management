import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products.reducers";
import { sumProducts } from "src/app/utils/sum-products";

export const selectProductsState = createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
    selectProductsState,
    (productState) => productState.products
);

export const selectProductsLoading = createSelector(
    selectProductsState,
    (productState) => productState.loading
);

export const selectProductShowCode = createSelector(
    selectProductsState,
    (productState) => productState.showProductCode
);

export const selectProductsError = createSelector(
    selectProductsState,
    (productState) => productState.errorMessage
);

export const selectTotalProducts = createSelector(
    selectProducts,
    sumProducts
);