import axios from "axios"
import {productFail, productRequest, productSuccess} from '../slices/productSlices'

export const getProduct = ({id}) => async (dispatch) =>{
    try{
        dispatch(productRequest())
        const {data} = await axios.get(`/api/product/product/${id}`)
        dispatch(productSuccess(data))
    }
    catch(error){
        dispatch(productFail(error.response.data.message))
    }
}