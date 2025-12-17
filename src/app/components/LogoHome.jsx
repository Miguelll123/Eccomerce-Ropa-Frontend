import React from 'react';
import { Link } from 'react-router-dom';

// Importar imágenes (las tendrás que añadir en /src/assets/)
// import heroImage from '../../assets/hero-landing.jpg';
// import category1Image from '../../assets/category-1.jpg';
// import category2Image from '../../assets/category-2.jpg';
// import category3Image from '../../assets/category-3.jpg';

const LogoHome = () => {
  return (
    <div className="home-landing">
      {/* HERO SECTION - Imagen grande principal */}
      <section className="hero-section">
        <div className="hero-image">
          {/* <img src={heroImage} alt="Hero" /> */}
          <div className="hero-placeholder">HERO IMAGE</div>
        </div>
        <div className="hero-content">
          <h1 className="hero-title">Título Principal</h1>
          <p className="hero-subtitle">Subtítulo o descripción</p>
          <Link to="/shop" className="hero-cta">
            Shop Now
          </Link>
        </div>
      </section>

      {/* CATEGORIES/COLLECTIONS SECTION - Secciones con imágenes */}
      <section className="categories-section">
        <div className="category-item">
          <div className="category-image">
            {/* <img src={category1Image} alt="Category 1" /> */}
            <div className="category-placeholder">CATEGORY 1 IMAGE</div>
          </div>
          <div className="category-content">
            <h2>Category 1</h2>
            <Link to="/shop?category=category1">Shop Category 1</Link>
          </div>
        </div>

        <div className="category-item">
          <div className="category-image">
            {/* <img src={category2Image} alt="Category 2" /> */}
            <div className="category-placeholder">CATEGORY 2 IMAGE</div>
          </div>
          <div className="category-content">
            <h2>Category 2</h2>
            <Link to="/shop?category=category2">Shop Category 2</Link>
          </div>
        </div>

        <div className="category-item">
          <div className="category-image">
            {/* <img src={category3Image} alt="Category 3" /> */}
            <div className="category-placeholder">CATEGORY 3 IMAGE</div>
          </div>
          <div className="category-content">
            <h2>Category 3</h2>
            <Link to="/shop?category=category3">Shop Category 3</Link>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS SECTION - Productos destacados */}
      <section className="featured-section">
        <h2 className="featured-title">Featured Products</h2>
        <div className="featured-grid">
          {/* Estos productos los puedes traer del backend o hardcodear algunos */}
          <div className="featured-item">
            <div className="featured-image">
              <div className="featured-placeholder">PRODUCT IMAGE 1</div>
            </div>
            <h3>Product Name 1</h3>
            <p>£99.99</p>
            <Link to="/shop">View Product</Link>
          </div>

          <div className="featured-item">
            <div className="featured-image">
              <div className="featured-placeholder">PRODUCT IMAGE 2</div>
            </div>
            <h3>Product Name 2</h3>
            <p>£99.99</p>
            <Link to="/shop">View Product</Link>
          </div>

          <div className="featured-item">
            <div className="featured-image">
              <div className="featured-placeholder">PRODUCT IMAGE 3</div>
            </div>
            <h3>Product Name 3</h3>
            <p>£99.99</p>
            <Link to="/shop">View Product</Link>
          </div>

          <div className="featured-item">
            <div className="featured-image">
              <div className="featured-placeholder">PRODUCT IMAGE 4</div>
            </div>
            <h3>Product Name 4</h3>
            <p>£99.99</p>
            <Link to="/shop">View Product</Link>
          </div>
        </div>
      </section>

      {/* BANNER SECTION - Banner promocional */}
      <section className="banner-section">
        <div className="banner-image">
          {/* <img src={bannerImage} alt="Banner" /> */}
          <div className="banner-placeholder">BANNER IMAGE</div>
        </div>
        <div className="banner-content">
          <h2>Banner Title</h2>
          <p>Banner description or promotion text</p>
          <Link to="/shop" className="banner-cta">
            Explore Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LogoHome;
