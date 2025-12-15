import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getALL } from '../../features/Products/ProductsSlice'
import Product from './Product'

const Products = () => {
  const dispatch = useDispatch()
  const { products, loading } = useSelector(state => state.products)

  useEffect(() => {
    dispatch(getALL())
  }, [dispatch])

  if (loading) {
    return <div>Cargando productos...</div>
  }

  return (
    <div>
      <h2 className='title-products' style={{display:'flex', textAlign:'center', justifyContent:'center'}}>Productos</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
    </div>
  )
}

export default Products