import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'
import MetaData from '.././Layout/MetaData'
import { getProducts } from '../../actions/productsAction'
import { useDispatch, useSelector } from 'react-redux'
import Product from '.././Products/Product'
import Loader from '.././Layout/Loader'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'
import { useParams } from 'react-router-dom'

const SearchProduct = () => {

  const [currentPage,setCurrentPage] = useState(1)
  const dispatch = useDispatch()
  const {products,loading,error,resPerPage,count} = useSelector((state) => state.productsState)
  const {keyword} = useParams()
  
  useEffect(()=>{
    if(error){
      return toast.error(error,{position:'bottom-center'})
    }
    dispatch(getProducts(currentPage,keyword))
  },[error,dispatch,currentPage,keyword])
  
  const setCurrentPageNo = (pageNo) =>{
    setCurrentPage(pageNo)
   }

  return (
    <Fragment>
      {loading ? <Loader/> :
        <Fragment>
        <MetaData title={'Search Product'}/>
        <h1 id="products_heading" className='ml-3 mr-3'>Search Products</h1>
        <section id="products" className="container mt-5">
          <div className="row">
            {products && products.map(product =>(
              <Product product={product} key={product._id}/>
            ))}
          </div>
        </section>
        {count > 0 && count >resPerPage ?<div className='d-flex justify-center center mt-5'>
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
      </Fragment>
      }
    </Fragment>

  )
}

export default SearchProduct