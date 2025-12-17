import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productService from "./productService";

const initialState = {
    products: [],
    loading: false,
    error: null
};

export const getALL = createAsyncThunk('products/getALL', async (filters={}) => {
    try {
        const data = await productService.getALL(filters);
        console.log('Respuesta del backend:', data); // Debug temporal
        // El backend devuelve { ok: true, products: [...] }
        return data.products || data; // Si viene { ok: true, products: [...] } o directamente array
    } catch (error) {
        console.error('Error en getALL:', error);
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