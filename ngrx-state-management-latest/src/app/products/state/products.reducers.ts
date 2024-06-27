import { createReducer, createAction, on } from "@ngrx/store";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { Product } from "../product.model";

export interface ProductState {
    showProductCode: boolean;
    loading: boolean;
    products: Product[];
    errorMessage: string;
}

const initialState: ProductState = {
    showProductCode: true,
    loading: false,
    products: [],
    errorMessage: '',
}

export const productReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductsCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode
    })),
    on(ProductsPageActions.loadProducts, (state) => ({
        ...state,
        loading: true,
        products: [],
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => ({
        ...state,
        loading: false,
        products: products,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => ({
        ...state,
        loading: false,
        products: [],
        errorMessage: message
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsAddedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: [...state.products, product],
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsUpdatedSuccess, (state, { product }) => ({
        ...state,
        loading: false,
        products: state.products.map(x => x.id === product.id ? product : x),
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsUpdatedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.deleteProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsDeletedSuccess, (state, { id }) => ({
        ...state,
        loading: false,
        products: state.products.filter(x => x.id !== id),
        errorMessage: ''
    })),
    on(ProductsAPIActions.productsDeletedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message
    })),
)