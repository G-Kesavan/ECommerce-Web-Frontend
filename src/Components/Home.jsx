import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import MetaData from './Layout/MetaData'
import { getProducts } from '../actions/productsAction'
import { useDispatch, useSelector } from 'react-redux'
import Product from './Products/Product'
import Loader from './Layout/Loader'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'

const Home = () => {
  const [currentPage,setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const {products,loading,error,resPerPage,count} = useSelector((state) => state.productsState)
  
  useEffect(()=>{
    if(error){
      return toast.error(error,{position:'bottom-center'})
    }
    dispatch(getProducts(currentPage))
  },[error,dispatch,currentPage])
  
  const setCurrentPageNo = (pageNo) =>{
    setCurrentPage(pageNo)
   }

  return (
    <>
      {loading ? <Loader/> :
        <>
          <MetaData title={'Buy Best Product'}/>
          <h1 id="products_heading" className='ml-3 mr-3'>Latest Products</h1>
          
          <section id="products" className="container mt-5">
            <div className="row">
              {products && products.map(product =>(
                <Product product={product} key={product._id}/>
              ))}
            </div>
          </section>

          {count > 0 && count > resPerPage ?
            <div className='d-flex justify-center center mt-5'>
              <Pagination
                activePage={currentPage}
                onChange={setCurrentPageNo}
                totalItemsCount={count}
                itemsCountPerPage={resPerPage}
                nextPageText='Next'
                firstPageText='First'
                lastPageText='Last'
                itemClass='page-item'
                linkClass='page-link'
              />
            </div>:null}
      </>
      }
    </>

  )
}

export default Home