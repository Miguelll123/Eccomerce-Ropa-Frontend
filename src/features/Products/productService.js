
import axios from 'axios';

const API_URL = "http://localhost:3000/products";



const getALL = async ()=> {
    const res = await axios.get(API_URL);
    return res.data
}

const productService = {
    getALL
}



export default productService