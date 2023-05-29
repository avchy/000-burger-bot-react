import './App.scss'
// import Form from './components/Form'
// import { Header } from './components/Header'
import { Products } from './pages/Products'
import { Order } from './pages/Order'
import { Checkout } from './pages/Checkout'
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
