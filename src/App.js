import './App.scss'
// import Form from './components/Form'
// import { Header } from './components/Header'
import { ProductsPage } from './pages/ProductsPage'
import { OrderPage } from './pages/OrderPage'
import { CheckoutPage } from './pages/CheckoutPage'
import { Routes, Route } from 'react-router-dom'

// const { getData } = require('./db/db')
// const foods = getData()

export function App() {
    return (
        <>
            <div className='App'>
                {/* <Header /> */}
                <Routes>
                    <Route index element={<ProductsPage />} />
                    <Route path={'checkout'} element={<CheckoutPage />} />
                    <Route path={'order'} element={<OrderPage />} />
                </Routes>
            </div>
        </>
    )
}
