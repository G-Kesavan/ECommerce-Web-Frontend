import React, { useEffect } from 'react'
import { Fragment } from 'react'
import MetaData from './Layout/MetaData'
import { getProducts } from '../actions/productsAction'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Products/Product'

const Home = () => {
  const dispatch = useDispatch()
  const {products,loading} = useSelector((state) => state.productsState)
  useEffect(()=>{
    dispatch(getProducts)
  },[])
  return (
    <Fragment>
      <MetaData title={'Buy Best Product'}/>
      <h1 id="products_heading">Latest Products</h1>
      <section id="products" className="container mt-5">
        <div className="row">
          {products && products.map(product =>(
            <Product product={product}/>
          ))}
        </div>
      </section>
    </Fragment>
  )
}

export default Home