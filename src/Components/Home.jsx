import React, { useEffect } from 'react'
import { Fragment } from 'react'
import MetaData from './Layout/MetaData'
import { getProducts } from '../actions/productsAction'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Products/Product'
import Loader from './Layout/Loader'
import { toast } from 'react-toastify'

const Home = () => {
  const dispatch = useDispatch()
  const {products,loading,error} = useSelector((state) => state.productsState)
  useEffect(()=>{
    if(error){
      return toast.error(error,{position:'bottom-center'})
    }
    dispatch(getProducts)
  },[error])
  return (
    <Fragment>
      {loading ? <Loader/> :
        <Fragment>
        <MetaData title={'Buy Best Product'}/>
        <h1 id="products_heading">Latest Products</h1>
        <section id="products" className="container mt-5">
          <div className="row">
            {products && products.map(product =>(
              <Product product={product} key={product._id}/>
            ))}
          </div>
        </section>
      </Fragment>
      }
    </Fragment>

  )
}

export default Home