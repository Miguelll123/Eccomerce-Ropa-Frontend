import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import camisetas from '../../assets/concepto-de-maqueta-de-camisa-con-ropa-sencilla.jpg';
import camisas from '../../assets/fujiphilm-L9mmEncrB6M-unsplash.jpg';
import camisetblanca from '../../assets/haryo-setyadi-acn5ERAeSb4-unsplash.jpg';
import chanclas from '../../assets/jakob-owens-WzncgWs3RJ4-unsplash.jpg';
import reloj from '../../assets/saif71-com-brqTWpFkmSQ-unsplash.jpg';
import '../components/LogoHome.css'
import Product from '../components/Product';
import {getALL} from '../../features/Products/ProductsSlice';
import { useDispatch, useSelector } from 'react-redux';

const LogoHome = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {products,isLoading} = useSelector(state =>state.products);
  const featuredProducts = products.slice(0,4);

  useEffect(()=> {
    dispatch(getALL())
  },[dispatch])

  return (
    <div className="home-landing">

      <section 
        className="hero-section"
        style={{ backgroundImage: `url(${camisetas})` }}
      >
        
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Título Principal</h1>
          <p className="hero-subtitle">Subtítulo o descripción</p>
          <Link to="/shop" className="hero-cta">Shop Now</Link>
        </div>
        
      </section>

      <section className="categories-section">

        <div className="category-item">
          <div className="category-image">
            <img src={camisetblanca} alt="" />
          </div>
          <div className="category-content">
            <h2>Category 1</h2>
            <Link to="/shop?category=category1">Shop Category 1</Link>
          </div>
        </div>

        <div className="category-item">
          <div className="category-image">
            <img src={chanclas} alt="" />
          </div>
          <div className="category-content">
            <h2>Category 2</h2>
            <Link to="/shop?category=category2">Shop Category 2</Link>
          </div>
        </div>

        <div className="category-item">
          <div className="category-image">
            <img src={reloj} alt="" />
          </div>
          <div className="category-content">
            <h2>Category 3</h2>
            <Link to="/shop?category=category3">Shop Category 3</Link>
          </div>
        </div>

      </section>

      <section className="featured-section">
        <div className='container-title'>
        <h2 className="featured-title">Featured Products</h2>
        </div>
        <div className="container-journat">
          <div className="journay-image-1">
            <img
              src={camisas}
              alt=""
              onClick={() => navigate("/shop")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className='journay-image-2'>
           <img src={reloj} alt='' style={{cursor:'pointer'}}/>
          </div>
          <div className='journay-image-2'>
            <img src={chanclas} alt='' style={{cursor:'pointer'}}/>
          </div>
        </div>
      </section>
      <section className='featured-products-section'>
      <div className='Title-grid'>
        <h2>Featured Products Grid</h2>
      </div>
      <div>
      {products && products.length >0 ? (
        <div className='featured-products-grid'>
          {featuredProducts.map((product)=>(
            <Product key={product._id} product={product}/>
          ))}
          </div>
      ) : (
        <p>No hay productos disponibles</p>
      )}
      </div>
      </section>
    </div>
  );
};

export default LogoHome;
