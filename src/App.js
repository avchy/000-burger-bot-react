import { useState, useEffect, useCallback } from 'react'
import './App.scss'
import Card from './components/Card/Card'
import Cart from './components/Cart/Cart'
import Form from './components/Form/Form'
import Header from './components/Header/Header'
import ProductList from './components/ProductList/ProductList'
import OrderPage from './components/OrderPage/OrderPage'
import { Link } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'

const { getData } = require('./db/db')
const foods = getData()

function App() {
    return (
        <>
            <div className='App'>
                {/* <Header /> */}
                <Routes>
                    <Route index element={<ProductList />} />
                    <Route path={'form'} element={<Form />} />
                    <Route path={'order'} element={<OrderPage />} />
                </Routes>
            </div>
        </>
    )
}

export default App
