# 📚 FLUJO COMPLETO: Sidebar de Filtros y Lista de Productos

## 🗂️ ESTRUCTURA DE ARCHIVOS

```
Frontend_Eccomerce/
├── src/
│   ├── App.jsx                          # Componente raíz, configura rutas
│   ├── app/
│   │   ├── store.js                     # Configuración de Redux Store
│   │   └── components/
│   │       ├── Products.jsx             # Componente principal (layout + productos)
│   │       ├── Products.css             # Estilos del layout principal
│   │       ├── Product.jsx              # Tarjeta individual de producto
│   │       ├── Product.css              # Estilos de tarjeta de producto
│   │       ├── sidebarFilters.jsx       # Componente del sidebar de filtros
│   │       └── sidebarFilters.css       # Estilos del sidebar
│   └── features/
│       └── Products/
│           ├── ProductsSlice.js         # Redux slice (estado + acciones)
│           └── productService.js        # Servicio API (llamadas al backend)
```

---

## 🔄 FLUJO COMPLETO DE DATOS

### **1. INICIO: Usuario entra a la página**

```
App.jsx (ruta "/")
    ↓
Products.jsx se monta
    ↓
useEffect dispara: dispatch(getALL())
```

### **2. REDUX: Thunk ejecuta la petición**

```
Products.jsx
    ↓ dispatch(getALL())
ProductsSlice.js (getALL thunk)
    ↓
productService.getALL()
    ↓
GET http://localhost:3000/products
    ↓
Backend devuelve: { ok: true, products: [...] }
    ↓
Redux actualiza: state.products.products = [...]
```

### **3. RENDER: Componentes se actualizan**

```
Redux Store actualizado
    ↓
Products.jsx re-renderiza (useSelector detecta cambio)
    ↓
SidebarFilters.jsx re-renderiza (lee products de Redux)
    ↓
Se muestran productos y filtros disponibles
```

---

## 🎨 LAYOUT: Cómo funciona el diseño (Sidebar Izquierda + Productos Derecha)

### **CSS Flexbox en `Products.css`**

```css
.products-page {
  display: flex;              /* ← Esto crea el layout horizontal */
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 24px;
  gap: 3rem;                  /* ← Espacio entre sidebar y contenido */
}
```

**Explicación:**
- `display: flex` → Crea un contenedor flexible horizontal
- `gap: 3rem` → Espacio de 3rem entre los dos elementos hijos

### **Estructura HTML en `Products.jsx`**

```jsx
<div className="products-page">          {/* Contenedor flex */}
  <SidebarFilters />                     {/* Hijo 1: Sidebar (izquierda) */}
  <div className="products-content">     {/* Hijo 2: Contenido (derecha) */}
    <h2>Productos</h2>
    <div className="products-grid">
      {/* Grid de productos */}
    </div>
  </div>
</div>
```

### **CSS del Sidebar en `sidebarFilters.css`**

```css
.sidebar-filters {
  width: 240px;              /* ← Ancho fijo del sidebar */
  flex-shrink: 0;            /* ← No se encoge nunca */
  padding-right: 2rem;
  border-right: 1px solid #e5e5e5;  /* ← Línea divisoria */
}
```

**Explicación:**
- `width: 240px` → Ancho fijo de 240px
- `flex-shrink: 0` → No se reduce aunque falte espacio
- `border-right` → Línea vertical que separa sidebar de contenido

### **CSS del Contenido en `Products.css`**

```css
.products-content {
  flex: 1;                   /* ← Ocupa todo el espacio restante */
  min-width: 0;              /* ← Permite que se ajuste correctamente */
}
```

**Explicación:**
- `flex: 1` → El contenido ocupa todo el espacio disponible después del sidebar
- `min-width: 0` → Evita problemas de overflow en flexbox

**Resultado Visual:**
```
┌─────────────────────────────────────────┐
│  [Sidebar 240px] │  [Contenido flex]   │
│                  │                      │
│  - Color         │  Productos           │
│  - Size          │  [Grid de productos] │
│  - Reset         │                      │
└─────────────────────────────────────────┘
```

---

## 🔍 FILTROS: Cómo funcionan paso a paso

### **Paso 1: Usuario hace click en un color**

```jsx
// En sidebarFilters.jsx
<input
  type="checkbox"
  checked={filters.colors.includes(color)}
  onChange={() => handleColorChange(color)}  // ← Se ejecuta esto
/>
```

### **Paso 2: Handler actualiza el estado local**

```jsx
const handleColorChange = (color) => {
  setFilters(prev => {
    const newColors = prev.colors.includes(color)
      ? prev.colors.filter(c => c !== color)  // Si ya está, lo quita
      : [...prev.colors, color];              // Si no está, lo añade
    return { ...prev, colors: newColors };
  });
};
```

**Ejemplo:**
- Estado inicial: `filters.colors = []`
- Usuario click en "rojo": `filters.colors = ["rojo"]`
- Usuario click en "azul": `filters.colors = ["rojo", "azul"]`
- Usuario click en "rojo" otra vez: `filters.colors = ["azul"]`

### **Paso 3: useEffect detecta el cambio**

```jsx
useEffect(() => {
  // No disparar en el primer render
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return;
  }
  
  // Disparar cuando el usuario cambia los filtros
  dispatch(getALL(filters));  // ← Se ejecuta con los nuevos filtros
}, [filters, dispatch]);
```

**Explicación:**
- `useRef(true)` → Guarda si es el primer render
- En el primer render, NO dispara (porque `Products.jsx` ya cargó los productos)
- En renders siguientes, SÍ dispara cuando `filters` cambia

### **Paso 4: productService construye la URL**

```jsx
// En productService.js
const getALL = async (filters = {}) => {
  const params = new URLSearchParams();
  
  // Si filters.colors = ["rojo", "azul"]
  if (filters.colors && filters.colors.length > 0) {
    filters.colors.forEach(color => params.append('color', color));
    // Resultado: params = "color=rojo&color=azul"
  }
  
  const queryString = params.toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;
  // Resultado: "http://localhost:3000/products?color=rojo&color=azul"
  
  const res = await axios.get(url);
  return res.data;
}
```

### **Paso 5: Backend filtra y devuelve productos**

```
GET /products?color=rojo&color=azul
    ↓
Backend filtra productos que tengan "rojo" O "azul"
    ↓
Devuelve: { ok: true, products: [producto1, producto2, ...] }
```

### **Paso 6: Redux actualiza el estado**

```jsx
// En ProductsSlice.js
.addCase(getALL.fulfilled, (state, action) => {
  state.loading = false;
  state.products = action.payload;  // ← Se actualizan los productos
})
```

### **Paso 7: Componentes re-renderizan**

```
Redux actualizado
    ↓
Products.jsx re-renderiza (useSelector detecta cambio)
    ↓
products.map() muestra solo los productos filtrados
```

---

## 🧩 CONEXIÓN ENTRE COMPONENTES

### **1. Products.jsx (Componente Principal)**

**Responsabilidades:**
- Cargar productos iniciales (sin filtros)
- Mostrar layout: sidebar + grid de productos
- Leer productos de Redux y renderizarlos

**Código clave:**
```jsx
const { products, loading, error } = useSelector(state => state.products);

useEffect(() => {
  dispatch(getALL());  // Carga inicial
}, [dispatch]);

return (
  <div className="products-page">
    <SidebarFilters />           {/* Sidebar a la izquierda */}
    <div className="products-content">
      <div className="products-grid">
        {products.map(product => <Product key={product._id} product={product} />)}
      </div>
    </div>
  </div>
);
```

### **2. SidebarFilters.jsx (Componente de Filtros)**

**Responsabilidades:**
- Mantener estado local de filtros seleccionados
- Extraer colores/tallas únicos de los productos
- Disparar peticiones cuando cambian los filtros
- Renderizar checkboxes de colores y tallas

**Código clave:**
```jsx
// Estado local de filtros
const [filters, setFilters] = useState({
  colors: [],
  sizes: [],
  minPrice: '',
  maxPrice: '',
  sort: '-createdAt'
});

// Leer productos de Redux para extraer opciones
const { products } = useSelector(state => state.products);

// Extraer colores únicos
const availableColors = [...new Set(products.flatMap(p => p.colors || []))];

// Cuando cambian los filtros, disparar petición
useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return;  // No disparar en el primer render
  }
  dispatch(getALL(filters));  // Disparar con filtros
}, [filters, dispatch]);
```

### **3. ProductsSlice.js (Redux Slice)**

**Responsabilidades:**
- Definir el estado de productos en Redux
- Crear el thunk `getALL` para peticiones asíncronas
- Manejar estados: pending, fulfilled, rejected

**Código clave:**
```jsx
export const getALL = createAsyncThunk('products/getALL', async (filters={}) => {
  const data = await productService.getALL(filters);
  return data.products || data;
});

// Reducers para actualizar estado
.addCase(getALL.fulfilled, (state, action) => {
  state.loading = false;
  state.products = action.payload;
})
```

### **4. productService.js (Servicio API)**

**Responsabilidades:**
- Construir URLs con query parameters
- Hacer peticiones HTTP al backend
- Devolver datos formateados

**Código clave:**
```jsx
const getALL = async (filters = {}) => {
  const params = new URLSearchParams();
  
  // Construir query params
  if (filters.colors && filters.colors.length > 0) {
    filters.colors.forEach(color => params.append('color', color));
  }
  
  const queryString = params.toString();
  const url = queryString ? `${API_URL}?${queryString}` : API_URL;
  
  const res = await axios.get(url);
  return res.data;
}
```

---

## 🎯 PUNTOS CLAVE DEL DISEÑO

### **1. Evitar bucles infinitos**

**Problema:** Si `SidebarFilters` dispara al montar, se harían 2 peticiones (una de `Products.jsx` y otra de `SidebarFilters`).

**Solución:** Usar `useRef` para detectar el primer render:
```jsx
const isInitialMount = useRef(true);

useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return;  // No disparar en el primer render
  }
  dispatch(getALL(filters));
}, [filters, dispatch]);
```

### **2. Extraer opciones de filtros dinámicamente**

**Problema:** No sabemos qué colores/tallas hay disponibles hasta que carguen los productos.

**Solución:** Leer productos de Redux y extraer valores únicos:
```jsx
const availableColors = [...new Set(products.flatMap(p => p.colors || []))];
// flatMap: [["rojo","azul"], ["azul","negro"]] → ["rojo","azul","azul","negro"]
// new Set: Elimina duplicados → ["rojo","azul","negro"]
// [...]: Convierte Set a Array
```

### **3. Layout responsive con Flexbox**

**Problema:** Sidebar y contenido deben estar lado a lado en desktop, pero apilados en mobile.

**Solución:** CSS Flexbox con media queries:
```css
.products-page {
  display: flex;  /* Desktop: lado a lado */
}

@media (max-width: 768px) {
  .products-page {
    flex-direction: column;  /* Mobile: apilados */
  }
}
```

---

## 📊 DIAGRAMA DE FLUJO COMPLETO

```
┌─────────────────────────────────────────────────────────────┐
│                    USUARIO ENTRAR A "/"                     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│              Products.jsx se monta                           │
│              useEffect → dispatch(getALL())                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         ProductsSlice.js: getALL thunk                       │
│         → productService.getALL()                            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         productService.js                                    │
│         GET http://localhost:3000/products                   │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Backend devuelve: { ok: true, products: [...] }     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Redux actualiza: state.products.products            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Products.jsx re-renderiza                            │
│         SidebarFilters.jsx re-renderiza                      │
│         → Muestra productos y opciones de filtros           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│         USUARIO HACE CLICK EN FILTRO (ej: color "rojo")     │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         handleColorChange("rojo")                            │
│         → setFilters({ colors: ["rojo"] })                  │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         useEffect detecta cambio en filters                  │
│         → dispatch(getALL({ colors: ["rojo"] }))            │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         productService construye URL:                        │
│         GET /products?color=rojo                             │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Backend filtra y devuelve productos con "rojo"      │
└───────────────────────┬─────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────────────┐
│         Redux actualiza productos                            │
│         Products.jsx re-renderiza con productos filtrados   │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ RESUMEN RÁPIDO

1. **Layout:** Flexbox en `Products.css` crea sidebar izquierda + contenido derecha
2. **Carga inicial:** `Products.jsx` carga todos los productos al montar
3. **Filtros:** `SidebarFilters.jsx` mantiene estado local y dispara peticiones cuando cambian
4. **Redux:** `ProductsSlice.js` maneja el estado global de productos
5. **API:** `productService.js` construye URLs con query params y hace peticiones
6. **Evitar bucles:** `useRef` previene peticiones duplicadas al montar

---

## 🔧 ARCHIVOS CLAVE Y SU FUNCIÓN

| Archivo | Función Principal |
|---------|-------------------|
| `Products.jsx` | Layout principal, carga inicial, renderiza grid |
| `Products.css` | Estilos del layout (flexbox, grid) |
| `sidebarFilters.jsx` | Lógica de filtros, estado local, handlers |
| `sidebarFilters.css` | Estilos del sidebar (colores, tallas, botones) |
| `ProductsSlice.js` | Redux: estado global, thunks, reducers |
| `productService.js` | API: construcción de URLs, peticiones HTTP |

---

**¿Dudas? Revisa este documento para entender cualquier parte del flujo.**


