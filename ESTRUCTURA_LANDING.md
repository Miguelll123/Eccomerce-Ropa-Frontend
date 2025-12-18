# Estructura de la Landing Page (Manors Golf Style)

## 📐 ESTRUCTURA RECOMENDADA DE DIVS

### 1. HERO SECTION (Imagen grande con texto superpuesto)
```
<section className="hero-section">
  <div className="hero-container">          ← Contenedor principal (max-width, centrado)
    <div className="hero-image-wrapper">    ← Wrapper para la imagen
      <img src={...} alt="..." />
    </div>
    <div className="hero-overlay">          ← Overlay oscuro (opcional, para legibilidad)
    </div>
    <div className="hero-content">          ← Contenido de texto (posición absoluta sobre la imagen)
      <h1>Give the gift of Golf</h1>
      <p>Spend £50 to claim Free Gift</p>
      <Link to="/shop">Shop Now</Link>
    </div>
  </div>
</section>
```

**¿Por qué tantos divs?**
- `hero-container`: Controla el ancho máximo y centra el contenido
- `hero-image-wrapper`: Permite controlar el tamaño/aspecto de la imagen
- `hero-overlay`: Capa semitransparente para que el texto se lea mejor
- `hero-content`: Contenido posicionado absolutamente sobre la imagen

---

### 2. GUIDE/CAROUSEL SECTION (Ej: "The Christmas Golf Guide")
```
<section className="guide-section">
  <div className="guide-container">         ← Contenedor con max-width
    <div className="guide-header">          ← Header con título y flechas
      <h2>The Christmas Golf Guide</h2>
      <div className="guide-nav">
        <button>←</button>
        <button>→</button>
      </div>
    </div>
    <div className="guide-carousel">        ← Contenedor del carousel
      <div className="guide-item">         ← Cada item del carousel
        <div className="guide-image">
          <img src={...} alt="..." />
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
```

---

### 3. BEST SELLERS SECTION (Grid de productos)
```
<section className="bestsellers-section">
  <div className="bestsellers-container">   ← Contenedor con max-width
    <h2 className="bestsellers-title">Shop The Best Sellers</h2>
    <div className="bestsellers-grid">       ← Grid container (CSS Grid o Flexbox)
      <div className="product-card">        ← Cada producto
        <div className="product-image">
          <img src={...} alt="..." />
        </div>
        <div className="product-info">
          <h3>Product Name</h3>
          <p className="product-variant">- Color</p>
          <p className="product-price">£130</p>
        </div>
      </div>
      {/* Más product-cards... */}
    </div>
  </div>
</section>
```

---

### 4. CATEGORIES SECTION (Grid de categorías)
```
<section className="categories-section">
  <div className="categories-container">    ← Contenedor con max-width
    <h2 className="categories-title">Categories</h2>
    <div className="categories-grid">       ← Grid de categorías
      <div className="category-card">       ← Cada categoría
        <div className="category-image">
          <img src={...} alt="..." />
        </div>
        <div className="category-content">
          <h3>Outerwear</h3>
          <Link to="/shop?category=outerwear">Shop Now</Link>
        </div>
      </div>
      {/* Más category-cards... */}
    </div>
  </div>
</section>
```

---

### 5. JOURNAL SECTION (Artículos/Blog)
```
<section className="journal-section">
  <div className="journal-container">       ← Contenedor con max-width
    <h2 className="journal-title">Journal</h2>
    <div className="journal-grid">          ← Grid de artículos
      <article className="journal-item">    ← Cada artículo
        <div className="journal-image">
          <img src={...} alt="..." />
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
```

---

## 🎯 REGLA GENERAL PARA DIVS

**Patrón estándar:**
```
<section>                    ← Sección semántica
  <div className="container"> ← Contenedor con max-width (ej: 1200px)
    <div className="header">  ← Header de la sección (título, navegación)
    <div className="content"> ← Contenido principal (grid, lista, etc.)
      <div className="item">  ← Cada item individual
        <div className="image">
        <div className="info">
      </div>
    </div>
  </div>
</section>
```

**¿Cuándo usar cada div?**
- `container`: Siempre que quieras limitar el ancho y centrar
- `wrapper`: Cuando necesites controlar el tamaño/aspecto de una imagen
- `overlay`: Para capas semitransparentes sobre imágenes
- `content`: Para agrupar texto/información
- `grid`/`flex`: Para layouts de múltiples items

---

## ⚛️ DIFERENCIAS: REACT vs HTML VANILLA

### 1. NAVEGACIÓN

**HTML Vanilla:**
```html
<a href="/shop">Shop</a>  ← Recarga toda la página
```

**React (React Router):**
```jsx
import { Link, useNavigate } from 'react-router-dom';

// Opción 1: Componente Link (recomendado)
<Link to="/shop">Shop</Link>

// Opción 2: useNavigate hook (para navegación programática)
const navigate = useNavigate();
<img onClick={() => navigate("/shop")} src={...} />
```

**Diferencia clave:** React Router NO recarga la página, solo cambia el componente.

---

### 2. EVENTOS

**HTML Vanilla:**
```html
<img onclick="goToShop()" src="..." />
<script>
  function goToShop() {
    window.location.href = "/shop";
  }
</script>
```

**React:**
```jsx
const navigate = useNavigate();

<img 
  onClick={() => navigate("/shop")} 
  src={...} 
  style={{ cursor: "pointer" }}
/>
```

**Diferencia:** En React, los eventos van directamente en el JSX con `onClick`, `onChange`, etc.

---

### 3. CLASES CSS

**HTML Vanilla:**
```html
<div class="container">  ← "class"
```

**React:**
```jsx
<div className="container">  ← "className" (porque "class" es palabra reservada en JS)
```

---

### 4. ESTILOS INLINE

**HTML Vanilla:**
```html
<div style="color: red; font-size: 20px;">
```

**React:**
```jsx
// Opción 1: String (igual que HTML)
<div style="color: red; font-size: 20px;">

// Opción 2: Objeto (recomendado)
<div style={{ color: 'red', fontSize: '20px' }}>
```

**Diferencia:** En React puedes usar objetos JS para estilos, y las propiedades CSS se escriben en camelCase.

---

### 5. IMPORTAR IMÁGENES

**HTML Vanilla:**
```html
<img src="/images/hero.jpg" alt="..." />
```

**React:**
```jsx
// Opción 1: Import (recomendado - Vite optimiza la imagen)
import heroImage from '../../assets/hero.jpg';
<img src={heroImage} alt="..." />

// Opción 2: Ruta pública (si está en /public)
<img src="/images/hero.jpg" alt="..." />
```

**Diferencia:** En React, importar imágenes permite que Vite las optimice automáticamente.

---

## 🔄 PROCESO COMPLETO: CLICK EN IMAGEN → NUEVA PÁGINA

### Escenario: Click en categoría → Ir a /shop con filtro

**1. En LogoHome.jsx:**
```jsx
import { Link, useNavigate } from 'react-router-dom';

const LogoHome = () => {
  const navigate = useNavigate();

  return (
    <section className="categories-section">
      <div className="category-item">
        <div className="category-image">
          {/* OPCIÓN 1: Usar Link (envuelve la imagen) */}
          <Link to="/shop?category=outerwear">
            <img src={...} alt="Outerwear" />
          </Link>

          {/* OPCIÓN 2: Usar onClick con navigate */}
          <img 
            src={...} 
            alt="Outerwear"
            onClick={() => navigate("/shop?category=outerwear")}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </section>
  );
};
```

**2. En Products.jsx (página /shop):**
```jsx
import { useSearchParams } from 'react-router-dom';

const Products = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category'); // Obtiene "outerwear"

  useEffect(() => {
    // Filtrar productos por categoría
    if (category) {
      dispatch(getALL({ category }));
    } else {
      dispatch(getALL());
    }
  }, [category, dispatch]);

  return (
    <div>
      {/* Mostrar productos filtrados */}
    </div>
  );
};
```

**3. Flujo completo:**
```
Usuario click en imagen de categoría
    ↓
navigate("/shop?category=outerwear")
    ↓
React Router cambia la URL (sin recargar)
    ↓
Products.jsx se monta/actualiza
    ↓
useSearchParams lee "category=outerwear"
    ↓
useEffect dispara getALL({ category: "outerwear" })
    ↓
Backend devuelve productos filtrados
    ↓
Redux actualiza el estado
    ↓
Products.jsx muestra productos filtrados
```

---

## 📝 CHECKLIST PARA TU LANDING

- [ ] Hero section con imagen de fondo y texto superpuesto
- [ ] Sección de guía/carousel (opcional, si quieres)
- [ ] Sección de best sellers (productos destacados)
- [ ] Sección de categorías (grid de categorías)
- [ ] Sección de journal/blog (opcional)
- [ ] Footer (opcional, pero recomendado)

**Para cada sección:**
- [ ] `<section>` como contenedor principal
- [ ] `<div className="container">` para limitar ancho
- [ ] Divs separados para imagen y contenido
- [ ] Links o onClick para navegación
- [ ] Clases CSS descriptivas

---

## 💡 CONSEJOS FINALES

1. **Siempre usa contenedores:** Cada sección debería tener un `container` con `max-width` para que no se estire en pantallas grandes.

2. **Separa imagen de contenido:** Usa divs separados para imágenes y texto, así puedes posicionarlos independientemente.

3. **Usa Link para navegación:** Prefiere `<Link>` sobre `onClick` cuando sea posible, es más semántico.

4. **Nombres de clases descriptivos:** `hero-section`, `category-item`, `product-card` son mejores que `div1`, `div2`.

5. **React Router NO recarga:** Cuando navegas con React Router, la página NO se recarga, solo cambia el componente. Esto es más rápido.

