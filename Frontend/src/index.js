import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Layout from './pages/Layout';
import Home from './pages/Home';
import './css/home.css'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Account from './pages/Account'
import EditUser from './pages/EditUser'
import ProductDetails from './pages/ProductDetails';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Orders from './pages/Orders';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate replace to="/login" />}/>

            <Route path='/home' element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path="/home/search/:sq" element={<Search/>} />
              <Route path="/home/search/" element={<Navigate replace to="/home" />} />
            </Route>

            <Route path='/login' element = {<Login/>}/>
            <Route path='/signin' element = {<Signup/>}/>
            <Route path='/account' element = {<Account/>}/>
            <Route path='/account/edituser' element = {<EditUser/>}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/products/:ProductID' element = {<ProductDetails/>}/>
          </Routes>
        </BrowserRouter>
  </>
)