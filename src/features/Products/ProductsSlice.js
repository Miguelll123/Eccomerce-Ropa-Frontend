import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    products: [],
    loading: false,
    error: null
};

export const getALL = createAsyncThunk('products/getALL', async () => {
    try {
        const data = await productService.getALL();
        return data.products || data; // Si viene { ok: true, products: [...] } o directamente array
    } catch (error) {
        console.error(error);
        throw error;
    }
});

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getALL.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getALL.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(getALL.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;