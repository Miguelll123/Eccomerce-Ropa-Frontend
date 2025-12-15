import React from 'react'
import './Product.css'

const Product = ({ product }) => {
  // Función para obtener el color en formato CSS (si es un nombre de color)
  const getColorStyle = (colorName) => {
    const colorMap = {
      'rojo': '#FF0000',
      'azul': '#0000FF',
      'negro': '#000000',
      'blanco': '#FFFFFF',
      'verde': '#008000',
      'gris': '#808080',
      'amarillo': '#FFFF00',
      'naranja': '#FFA500',
      'rosa': '#FFC0CB',
      'morado': '#800080',
      'marron': '#8B4513',
      'beige': '#F5F5DC',
      'olive': '#808000',
      'steel': '#4682B4',
      'clay': '#B87333',
      'dark olive': '#556B2F',
      'navy': '#000080',
      'ivory': '#FFFFF0',
    };
    return colorMap[colorName?.toLowerCase()] || '#CCCCCC';
  };

  return (
    <div className="product-card">
      <div className="product-image-wrapper">
        {product.images && product.images.length > 0 ? (
          <img
            src={`http://localhost:3000${product.images[0].startsWith('/') ? product.images[0] : '/' + product.images[0]}`}
            alt={product.name}
            className="product-image"
            onError={(e) => {
              console.error('Error loading image:', product.images[0]);
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="product-no-image">Sin imagen</div>
        )}

        <button className="product-quick-buy">
          Quick Buy
        </button>
      </div>

      <div className="product-info">
        <h3 className="product-name">
          {product.name}
        </h3>
        <p className="product-price">
          £{product.price}
        </p>

        {product.colors && product.colors.length > 0 && (
          <div className="product-colors">
            {product.colors.map((color, index) => (
              <div
                key={index}
                className="product-color-dot"
                style={{ backgroundColor: getColorStyle(color) }}
                title={color}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Product