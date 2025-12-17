import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getALL } from '../../features/Products/ProductsSlice'
import Product from './Product'
import SidebarFilters from './sidebarFilters'
import './Products.css'

const Products = () => {
  const dispatch = useDispatch()
  const { products, loading, error } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getALL())
  }, [dispatch])

  // Debug temporal
  useEffect(() => {
    console.log('Products en Redux:', products);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [products, loading, error])

  if (loading) {
    return <div className="products-loading">Cargando productos...</div>
  }

  if (error) {
    return <div className="products-error">Error: {error}</div>
  }

  return (
    <div className="products-page">
      <SidebarFilters />
      <div className="products-content">
        <h2 className='title-products'>Productos</h2>
        <div className="products-grid">
          {products && products.length > 0 ? (
            products.map((product) => (
              <Product key={product._id} product={product} />
            ))
          ) : (
            <p className="no-products-message">No hay productos disponibles</p>
          )}
        </div>
      </div>
    </div>
  )
};




export default Products