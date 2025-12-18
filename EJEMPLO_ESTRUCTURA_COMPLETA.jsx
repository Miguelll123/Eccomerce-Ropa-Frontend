// EJEMPLO DE ESTRUCTURA COMPLETA - LogoHome.jsx
// Basado en Manors Golf - SOLO ESTRUCTURA, SIN CSS

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// Tus imports de imágenes...

const LogoHome = () => {
  const navigate = useNavigate();

  return (
    <div className="home-landing">
      
      {/* ============================================
          1. HERO SECTION (Imagen grande con texto superpuesto)
          ============================================ */}
      <section className="hero-section">
        <div className="hero-container">           {/* Contenedor con max-width */}
          <div className="hero-image-wrapper">     {/* Wrapper para controlar imagen */}
            <img src={camisetas} alt="Hero" />
          </div>
          <div className="hero-overlay"></div>     {/* Overlay oscuro (opcional) */}
          <div className="hero-content">           {/* Texto superpuesto */}
            <h1 className="hero-title">Give the gift of Golf</h1>
            <p className="hero-subtitle">Spend £50 to claim Free Gift</p>
            <Link to="/shop" className="hero-cta">Shop Now</Link>
          </div>
        </div>
      </section>

      {/* ============================================
          2. GUIDE/CAROUSEL SECTION (Opcional - "The Christmas Golf Guide")
          ============================================ */}
      <section className="guide-section">
        <div className="guide-container">
          <div className="guide-header">
            <h2 className="guide-title">The Christmas Golf Guide</h2>
            <div className="guide-nav">
              <button className="guide-arrow prev">←</button>
              <button className="guide-arrow next">→</button>
            </div>
          </div>
          <div className="guide-carousel">
            <div className="guide-item">
              <div className="guide-image">
                <img src={camisetblanca} alt="Luxury Gifts" />
              </div>
              <div className="guide-content">
                <h3>Luxury Gifts</h3>
                <Link to="/shop?category=luxury">Shop Now</Link>
              </div>
            </div>
            {/* Más guide-items... */}
          </div>
        </div>
      </section>

      {/* ============================================
          3. BEST SELLERS SECTION (Grid de productos destacados)
          ============================================ */}
      <section className="bestsellers-section">
        <div className="bestsellers-container">
          <h2 className="bestsellers-title">Shop The Best Sellers</h2>
          <div className="bestsellers-grid">
            <div className="product-card">
              <div className="product-image">
                <img src={camisetas} alt="Product Name" />
              </div>
              <div className="product-info">
                <h3 className="product-name">Product Name</h3>
                <p className="product-variant">- Color</p>
                <p className="product-price">£130</p>
              </div>
            </div>
            {/* Más product-cards... */}
          </div>
        </div>
      </section>

      {/* ============================================
          4. CATEGORIES SECTION (Grid de categorías)
          ============================================ */}
      <section className="categories-section">
        <div className="categories-container">
          <h2 className="categories-title">Categories</h2>
          <div className="categories-grid">
            <div className="category-item">
              <div className="category-image">
                {/* OPCIÓN 1: Link envuelve la imagen */}
                <Link to="/shop?category=outerwear">
                  <img src={camisetblanca} alt="Outerwear" />
                </Link>
              </div>
              <div className="category-content">
                <h3>Outerwear</h3>
                <Link to="/shop?category=outerwear">Shop Now</Link>
              </div>
            </div>

            <div className="category-item">
              <div className="category-image">
                {/* OPCIÓN 2: onClick con navigate */}
                <img 
                  src={chanclas} 
                  alt="Base & Mid-Layers"
                  onClick={() => navigate("/shop?category=base")}
                  style={{ cursor: "pointer" }}
                />
              </div>
              <div className="category-content">
                <h3>Base & Mid-Layers</h3>
                <Link to="/shop?category=base">Shop Now</Link>
              </div>
            </div>

            <div className="category-item">
              <div className="category-image">
                <Link to="/shop?category=bottoms">
                  <img src={reloj} alt="Bottoms" />
                </Link>
              </div>
              <div className="category-content">
                <h3>Bottoms</h3>
                <Link to="/shop?category=bottoms">Shop Now</Link>
              </div>
            </div>
            {/* Más category-items... */}
          </div>
        </div>
      </section>

      {/* ============================================
          5. BANNER/JOURNAL SECTION (Banner promocional o artículos)
          ============================================ */}
      <section className="banner-section">
        <div className="banner-container">
          <div className="banner-image">
            <img 
              src={camisas} 
              alt="Banner"
              onClick={() => navigate("/shop")}
              style={{ cursor: "pointer" }}
            />
          </div>
          <div className="banner-content">
            <h2>Banner Title</h2>
            <p>Banner description or promotion text</p>
            <Link to="/shop" className="banner-cta">Explore Collection</Link>
          </div>
        </div>
      </section>

      {/* ============================================
          6. JOURNAL SECTION (Opcional - Artículos/Blog)
          ============================================ */}
      <section className="journal-section">
        <div className="journal-container">
          <h2 className="journal-title">Journal</h2>
          <div className="journal-grid">
            <article className="journal-item">
              <div className="journal-image">
                <img src={camisetas} alt="Article Title" />
              </div>
              <div className="journal-content">
                <h3>Article Title</h3>
                <Link to="/journal/article-slug">Read more</Link>
              </div>
            </article>
            {/* Más journal-items... */}
          </div>
        </div>
      </section>

    </div>
  );
};

export default LogoHome;

