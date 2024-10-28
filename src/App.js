import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Home from './Pages/Home';
import Login from './Pages/Login';
import Product from './Pages/Product';
import Register from './Pages/Register';
import Cart from './Pages/Cart';
import AdminLogin from './Pages/AdminLogin';
import Admin from './Pages/Admin';
import { AuthProvider } from './Context/AuthContext';
import {PrivateRoute} from './Components/Authentication';
import {PublicRoute} from './Components/Authentication';
import MyProducts from './Pages/MyProducts';
import SearchResults from './Components/SearchResult';
import CategoryPage from './Pages/CategoryPage';

function App() {
  return (
    <AuthProvider>
      <div className="w-full m-auto bg-[#F1F2F4]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/login" 
            element={<PublicRoute element={<Login />} redirectPath="/" />} 
          />
          <Route 
            path="/register" 
            element={<PublicRoute element={<Register />} redirectPath="/" />} 
          />
          <Route 
            path="/adminLogin" 
            element={<PublicRoute element={<AdminLogin />} redirectPath="/admin" />} 
          />
          <Route 
            path="/admin" 
            element={<PrivateRoute element={<Admin />} redirectPath="/adminLogin" />} 
          />
          <Route 
            path="/cart" 
            element={<PrivateRoute element={<Cart />} redirectPath="/login" />} 
          />
          <Route 
            path="/myProducts" 
            element={<PrivateRoute element={<MyProducts />} redirectPath="/login" />} 
          />
        <Route path='/product/:id' element={<Product/>} />
        <Route path='/search' element={<SearchResults/>} />
        <Route path='/categoryPage/:categoryName' element={<CategoryPage/>} />
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
