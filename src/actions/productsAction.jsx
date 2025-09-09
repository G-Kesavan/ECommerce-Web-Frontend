import axios from "axios"
import {productsFail, productsRequest, productSuccess} from '../slices/productsSlices'

export const getProducts = async (dispatch) =>{
    try{
        dispatch(productsRequest())
        const {data} = await axios.get('/api/products/get-products')
        dispatch(productSuccess(data))
    }
    catch(error){
        dispatch(productsFail(error.response.data.message))
    }
}