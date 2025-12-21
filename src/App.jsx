import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './common/Header';
import Login from './app/components/Login';
import Products from './app/components/Products';
import LogoHome from './app/components/LogoHome';
import AbautHome from './app/components/Abaut';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Products/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/logo' element={<LogoHome/>}/>
          <Route path='/about' element={<AbautHome/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;