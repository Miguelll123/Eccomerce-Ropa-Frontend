import { useState } from 'react'
import './App.css';
import Header from './common/Header';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Header />
      {/* Aquí irán tus rutas/páginas */}
    </BrowserRouter>
  );
}

export default App;