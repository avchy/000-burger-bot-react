import './App.scss'
// eslint-disable-next-line import/no-unresolved
import Form from './components/Form/Form'
import ProductList from './components/ProductList/ProductList'
import OrderPage from './components/OrderPage/OrderPage'
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
