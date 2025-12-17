import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getALL } from "../../features/Products/ProductsSlice";
import './sidebarFilters.css';

// Función para convertir nombre de color a hex
const getColorHex = (colorName) => {
  const colorMap = {
    'rojo': '#FF0000',
    'red': '#FF0000',
    'azul': '#0000FF',
    'blue': '#0000FF',
    'negro': '#000000',
    'black': '#000000',
    'blanco': '#FFFFFF',
    'white': '#FFFFFF',
    'verde': '#008000',
    'green': '#008000',
    'gris': '#808080',
    'grey': '#808080',
    'gray': '#808080',
    'amarillo': '#FFFF00',
    'yellow': '#FFFF00',
    'naranja': '#FFA500',
    'orange': '#FFA500',
    'rosa': '#FFC0CB',
    'pink': '#FFC0CB',
    'morado': '#800080',
    'purple': '#800080',
    'marron': '#8B4513',
    'brown': '#8B4513',
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

const SidebarFilters = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector(state => state.products);
  const isInitialMount = useRef(true);

  const [filters, setFilters] = useState({
    colors: [],
    sizes: [],
    minPrice: '',
    maxPrice: '',
    sort: '-createdAt'
  });

  // Extraer colores/tallas únicos de los productos
  const availableColors = products && products.length > 0 
    ? [...new Set(products.flatMap(p => p.colors || []))]
    : [];
  
  const availableSizes = products && products.length > 0
    ? [...new Set(products.flatMap(p => p.sizes || []))]
    : [];

  // Handler para colores
  const handleColorChange = (color) => {
    setFilters(prev => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      return { ...prev, colors: newColors };
    });
  };

  // Handler para tallas
  const handleSizeChange = (size) => {
    setFilters(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };

  // Handler para reset
  const handleReset = () => {
    setFilters({
      colors: [],
      sizes: [],
      minPrice: '',
      maxPrice: '',
      sort: '-createdAt'
    });
  };

  // Cuando cambian los filtros, dispara la petición
  useEffect(() => {
    // No disparar en el primer render (Products.jsx ya carga los productos iniciales)
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    // Disparar cuando el usuario cambia los filtros
    dispatch(getALL(filters));
  }, [filters, dispatch]);

  return (
    <aside className="sidebar-filters">
      <div className="filter-section">
        <h3>Color</h3>
        <div className="color-grid">
          {availableColors.map(color => (
            <label key={color} className="color-option">
              <input
                type="checkbox"
                checked={filters.colors.includes(color)}
                onChange={() => handleColorChange(color)}
              />
              <span
                className="color-dot"
                style={{ backgroundColor: getColorHex(color) }}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="filter-section">
        <h3>Size</h3>
        <div className="size-list">
          {availableSizes.map(size => (
            <label key={size}>
              <input
                type="checkbox"
                checked={filters.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              {size}
            </label>
          ))}
        </div>
      </div>

      <button onClick={handleReset} className="reset-btn">Reset</button>
    </aside>
  );
};

export default SidebarFilters;
