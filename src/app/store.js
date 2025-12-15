
import {configureStore}  from "@reduxjs/toolkit";
import auth from '../features/auth/authSlice';
import products from '../features/Products/ProductsSlice';


export const store = configureStore({
    reducer : {
        auth,
        products
    }
})