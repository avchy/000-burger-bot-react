import './App.scss'
// import Form from './components/Form/Form'
import Header from './components/Header/Header'
import { Products } from './pages/Products/Products'
import { Order } from './pages/Order/Order'
import { Checkout } from './pages/Checkout/Checkout'
import { Routes, Route } from 'react-router-dom'

// const { getData } = require('./db/db')
// const foods = getData()

export function App() {
    return (
        <>
            <div className='App'>
                {/* <Header /> */}
                <Routes>
                    <Route index element={<Products />} />
                    <Route path={'checkout'} element={<Checkout />} />
                    <Route path={'order'} element={<Order />} />
                </Routes>
            </div>
        </>
    )
}
