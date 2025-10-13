import axios from "axios"
import {productsFail, productsRequest, productSuccess} from '../slices/productsSlices'

export const getProducts = (currentPage, keyword) => async (dispatch) =>{
    try{
        dispatch(productsRequest())
        if(keyword){
            const {data} = await axios.get('/api/products/get-products?page='+currentPage+'&keyword='+keyword)
            dispatch(productSuccess(data))
        }else{
            const {data} = await axios.get('/api/products/get-products?page='+currentPage)
            dispatch(productSuccess(data))
        }
    }
    catch(error){
        dispatch(productsFail(error.response.data.message))
    }
}