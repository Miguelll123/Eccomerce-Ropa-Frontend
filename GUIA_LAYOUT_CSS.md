# 📐 GUÍA COMPLETA: LAYOUT Y ESPACIO EN CSS

## 1. ¿QUIÉN CONTROLA EL ESPACIO DE CADA SECCIÓN?

### 🎯 RESPUESTA CORTA:
**TÚ lo controlas con CSS.** Por defecto, el navegador NO distribuye el espacio automáticamente. Cada elemento ocupa el 100% del ancho de su contenedor (a menos que le digas lo contrario).

---

## 2. COMPORTAMIENTO POR DEFECTO (SIN CSS)

### Elementos BLOCK (section, div, h1, p, etc.)
```html
<section>Sección 1</section>  ← Ocupa 100% del ancho disponible
<section>Sección 2</section>  ← Ocupa 100% del ancho disponible
<section>Sección 3</section>  ← Ocupa 100% del ancho disponible
```

**Resultado visual:**
```
┌─────────────────────────────────┐
│     Sección 1 (100% ancho)      │
├─────────────────────────────────┤
│     Sección 2 (100% ancho)      │
├─────────────────────────────────┤
│     Sección 3 (100% ancho)      │
└─────────────────────────────────┘
```

**Cada sección se apila verticalmente y ocupa TODO el ancho disponible.**

---

## 3. ¿PARA QUÉ SIRVEN LAS MEDIDAS (width, max-width, etc.)?

### 🎯 RESPUESTA:
**Para CONTROLAR el comportamiento del elemento.**

### Ejemplo 1: Sin medidas (comportamiento por defecto)
```css
.hero-section {
  /* Sin width, sin max-width */
}
```
**Resultado:** Ocupa 100% del ancho del navegador (1400px si la pantalla es 1400px)

```
┌─────────────────────────────────┐ 1400px
│     Hero Section (1400px)        │
└─────────────────────────────────┘
```

### Ejemplo 2: Con max-width (CONTROLAR ancho máximo)
```css
.hero-section {
  max-width: 1200px;  /* Nunca será más ancho que 1200px */
  margin: 0 auto;     /* Centra el contenido */
}
```
**Resultado:** Si la pantalla es 1400px, la sección será 1200px y estará centrada

```
┌─────────────────────────────────┐ 1400px (pantalla)
│  ┌──────────────────────────┐  │
│  │  Hero Section (1200px)   │  │ ← Centrado
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

**¿Por qué usar max-width?**
- En pantallas grandes (1920px), el contenido no se estira demasiado
- Mejora la legibilidad (líneas de texto no muy largas)
- Diseño más controlado y profesional

### Ejemplo 3: Con width fijo
```css
.hero-section {
  width: 1200px;  /* SIEMPRE será 1200px */
  margin: 0 auto;
}
```
**Resultado:** SIEMPRE 1200px, incluso en móviles (puede causar scroll horizontal)

```
Pantalla 1400px:
┌─────────────────────────────────┐
│  ┌──────────────────────────┐  │
│  │  Hero Section (1200px)   │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘

Pantalla 800px (móvil):
┌────────────────┐
│ ┌──────────────┼───┐ ← Se sale de la pantalla!
│ │ Hero (1200px)│   │
│ └──────────────┼───┘
└────────────────┘
```

**⚠️ Problema:** En móviles puede causar scroll horizontal (malo para UX)

### Ejemplo 4: Con width: 100% y max-width
```css
.hero-section {
  width: 100%;        /* Ocupa 100% del contenedor padre */
  max-width: 1200px; /* Pero nunca más de 1200px */
  margin: 0 auto;    /* Centra si es menor que el contenedor */
}
```
**Resultado:** Responsive y controlado

```
Pantalla 1400px:
┌─────────────────────────────────┐
│  ┌──────────────────────────┐  │
│  │  Hero Section (1200px)   │  │ ← max-width limita
│  └──────────────────────────┘  │
└─────────────────────────────────┘

Pantalla 800px:
┌────────────────┐
│ Hero (800px)   │ ← width: 100% permite que se ajuste
└────────────────┘
```

**✅ Esta es la MEJOR práctica para contenedores principales**

---

## 4. DISTRIBUCIÓN DEL ESPACIO: EJEMPLO PRÁCTICO

### Escenario: Pantalla de 1400px

```html
<div className="home-landing">  <!-- 1400px -->
  <section className="hero-section">...</section>
  <section className="categories-section">...</section>
  <section className="bestsellers-section">...</section>
</div>
```

### Sin CSS (comportamiento por defecto):
```css
/* Sin estilos */
```
**Resultado:**
- `hero-section`: 1400px (100%)
- `categories-section`: 1400px (100%)
- `bestsellers-section`: 1400px (100%)

Cada sección ocupa TODO el ancho disponible.

### Con max-width en contenedores:
```css
.hero-section {
  max-width: 1200px;
  margin: 0 auto;
}

.categories-section {
  max-width: 1200px;
  margin: 0 auto;
}

.bestsellers-section {
  max-width: 1200px;
  margin: 0 auto;
}
```
**Resultado:**
- `hero-section`: 1200px (centrado, con 100px de margen a cada lado)
- `categories-section`: 1200px (centrado)
- `bestsellers-section`: 1200px (centrado)

**Visual:**
```
┌─────────────────────────────────┐ 1400px
│  ┌──────────────────────────┐  │
│  │    Hero (1200px)         │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  Categories (1200px)     │  │
│  └──────────────────────────┘  │
│  ┌──────────────────────────┐  │
│  │  Bestsellers (1200px)    │  │
│  └──────────────────────────┘  │
└─────────────────────────────────┘
```

---

## 5. FLEXBOX: flex: 1, flex-shrink, etc.

### ¿Qué es Flexbox?
**Flexbox** es un sistema de layout que distribuye espacio entre elementos hijos.

### Conceptos básicos:

#### 1. `display: flex`
```css
.container {
  display: flex;  /* Activa flexbox */
}
```
**Resultado:** Los hijos se alinean horizontalmente (por defecto)

```
┌─────────────────────────────────┐
│ [Item1] [Item2] [Item3]        │ ← En fila
└─────────────────────────────────┘
```

#### 2. `flex: 1` (abreviatura)
```css
.item {
  flex: 1;  /* Es igual a: flex-grow: 1; flex-shrink: 1; flex-basis: 0; */
}
```

**¿Qué hace `flex: 1`?**
- `flex-grow: 1` → El elemento PUEDE crecer para llenar espacio disponible
- `flex-shrink: 1` → El elemento PUEDE encogerse si no hay espacio
- `flex-basis: 0` → El tamaño inicial es 0 (se calcula según el espacio disponible)

**Ejemplo:**
```css
.container {
  display: flex;
  width: 1200px;
}

.item1 { flex: 1; }  /* Ocupa 1 parte del espacio */
.item2 { flex: 1; }  /* Ocupa 1 parte del espacio */
.item3 { flex: 1; }  /* Ocupa 1 parte del espacio */
```
**Resultado:** Cada item ocupa 400px (1200px / 3 = 400px)

```
┌─────────────────────────────────┐ 1200px
│ [Item1: 400px] [Item2: 400px] [Item3: 400px] │
└─────────────────────────────────┘
```

**Si uno tiene `flex: 2`:**
```css
.item1 { flex: 2; }  /* Ocupa 2 partes */
.item2 { flex: 1; }  /* Ocupa 1 parte */
.item3 { flex: 1; }  /* Ocupa 1 parte */
```
**Resultado:** 
- Item1: 600px (2/4 del espacio)
- Item2: 300px (1/4 del espacio)
- Item3: 300px (1/4 del espacio)

```
┌─────────────────────────────────┐ 1200px
│ [Item1: 600px] [Item2: 300px] [Item3: 300px] │
└─────────────────────────────────┘
```

#### 3. `flex-shrink` (por separado)
```css
.item {
  flex-shrink: 1;  /* Puede encogerse (por defecto) */
}
```

**¿Cuándo se encoge?**
Cuando el contenedor es más pequeño que la suma de los items.

**Ejemplo:**
```css
.container {
  display: flex;
  width: 600px;  /* Contenedor pequeño */
}

.item {
  width: 300px;  /* Cada item quiere ser 300px */
  flex-shrink: 1; /* Puede encogerse */
}
```
**Resultado:** Cada item se encoge a 200px (600px / 3 = 200px)

```
┌──────────────────────┐ 600px
│ [200px] [200px] [200px] │ ← Se encogieron
└──────────────────────┘
```

**Si `flex-shrink: 0`:**
```css
.item {
  width: 300px;
  flex-shrink: 0;  /* NO puede encogerse */
}
```
**Resultado:** Los items mantienen 300px, pero se salen del contenedor

```
┌──────────────────────┐ 600px
│ [300px] [300px] [300px] │ ← Se salen!
└──────────────────────┘
```

#### 4. `flex-grow` (por separado)
```css
.item {
  flex-grow: 1;  /* Puede crecer para llenar espacio */
}
```

**¿Cuándo crece?**
Cuando hay espacio disponible en el contenedor.

**Ejemplo:**
```css
.container {
  display: flex;
  width: 1200px;
}

.item {
  width: 200px;  /* Tamaño inicial */
  flex-grow: 1;  /* Puede crecer */
}
```
**Resultado:** Cada item crece para llenar el espacio (400px cada uno)

```
┌─────────────────────────────────┐ 1200px
│ [400px] [400px] [400px] │ ← Crecieron
└─────────────────────────────────┘
```

---

## 6. EJEMPLO PRÁCTICO: CATEGORÍAS EN FILA

### Escenario: 3 categorías en una fila

```html
<section className="categories-section">
  <div className="categories-container">
    <div className="categories-grid">
      <div className="category-item">Category 1</div>
      <div className="category-item">Category 2</div>
      <div className="category-item">Category 3</div>
    </div>
  </div>
</section>
```

### Opción 1: Con Flexbox
```css
.categories-container {
  max-width: 1200px;
  margin: 0 auto;
}

.categories-grid {
  display: flex;
  gap: 20px;  /* Espacio entre items */
}

.category-item {
  flex: 1;  /* Cada uno ocupa 1/3 del espacio */
}
```
**Resultado:** Cada categoría ocupa el mismo espacio (390px aproximadamente)

```
┌─────────────────────────────────┐ 1200px
│ [Category1: 390px] [Category2: 390px] [Category3: 390px] │
└─────────────────────────────────┘
```

### Opción 2: Con CSS Grid
```css
.categories-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 columnas iguales */
  gap: 20px;
}
```
**Resultado:** Similar a flexbox, pero con Grid (más control para layouts complejos)

---

## 7. RESUMEN: ¿QUÉ MEDIDAS USAR?

### Para contenedores principales (section, div.container):
```css
.container {
  width: 100%;        /* Ocupa 100% del padre */
  max-width: 1200px;   /* Pero nunca más de 1200px */
  margin: 0 auto;      /* Centra si es menor */
  padding: 0 20px;     /* Padding lateral (opcional) */
}
```

### Para items en flexbox:
```css
.item {
  flex: 1;  /* Distribuye espacio equitativamente */
}

/* O si quieres tamaños específicos: */
.item-large {
  flex: 2;  /* Ocupa el doble */
}

.item-small {
  flex: 0.5;  /* Ocupa la mitad */
}
```

### Para items con tamaño fijo:
```css
.item {
  width: 300px;
  flex-shrink: 0;  /* No se encoge */
}
```

---

## 8. EJEMPLO COMPLETO: LANDING PAGE

```css
/* Contenedor principal */
.home-landing {
  width: 100%;  /* Ocupa todo el ancho del navegador */
}

/* Cada sección */
.hero-section,
.categories-section,
.bestsellers-section {
  width: 100%;        /* Ocupa 100% del ancho */
  max-width: 1400px;  /* Pero nunca más de 1400px */
  margin: 0 auto;     /* Centra */
  padding: 80px 20px; /* Espacio vertical y lateral */
}

/* Contenedor interno (para limitar contenido) */
.hero-container,
.categories-container {
  max-width: 1200px;  /* Contenido más estrecho */
  margin: 0 auto;
}

/* Grid de categorías */
.categories-grid {
  display: flex;
  gap: 30px;
}

.category-item {
  flex: 1;  /* Cada categoría ocupa el mismo espacio */
}
```

**Resultado visual:**
```
┌─────────────────────────────────────────┐ 1400px (pantalla)
│  ┌──────────────────────────────────┐  │
│  │  Hero Section (1200px contenido) │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │  Categories (1200px contenido) │  │
│  │  [Cat1: 390px] [Cat2: 390px] [Cat3: 390px] │
│  └──────────────────────────────────┘  │
└─────────────────────────────────────────┘
```

---

## ✅ REGLAS DE ORO

1. **Contenedores principales:** `width: 100%` + `max-width: 1200px` + `margin: 0 auto`
2. **Items en flexbox:** `flex: 1` para distribución equitativa
3. **Tamaños fijos:** `width: 300px` + `flex-shrink: 0` si no quieres que se encojan
4. **Responsive:** Usa `max-width` en lugar de `width` fijo
5. **Espacio entre items:** `gap: 20px` (mejor que margin individual)

