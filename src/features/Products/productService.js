
import axios from 'axios';

const API_URL = "http://localhost:3000/products";



const getALL = async (filters = {}) => {
    const params = new URLSearchParams();

    // Colores (plural)
    if (filters.colors && filters.colors.length > 0) {
        filters.colors.forEach(color => params.append('color', color));
    }

    // Tallas
    if (filters.sizes && filters.sizes.length > 0) {
        filters.sizes.forEach(size => params.append('size', size));
    }

    // Precios
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    // Ordenación
    if (filters.sort) params.append('sort', filters.sort);

    const queryString = params.toString();
    const url = queryString ? `${API_URL}?${queryString}` : API_URL;

    const res = await axios.get(url);
    return res.data;
}

const productService = {
    getALL
}



export default productService