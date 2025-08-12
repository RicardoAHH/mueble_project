import { useState } from 'react'
import { Route, Routes } from 'react-router'
import Home from './Pages/Home/Home'
import Header from './Components/Home/Header'
import Products from './Pages/Products/Products'
import ScrollToTop from './Hooks/ScrollToTop'
import ProductDetailCard from './Pages/ProductDetailCard/ProductDetailCard'
import Footer from './Components/Home/Footer'
import QuoteForm from './Pages/Cotizaciones/QuoteForm'
import About from './Pages/About/About'
import LoginAdmin from './Pages/LoginAdmin/LoginAdmin'
import ControlAdmin from './Pages/ControlAdmin/ControlAdmin'
import PrivateRoutes from './Components/LoginAdmin/PrivateRoutes'
import WPbutton from './Components/Home/WPbutton'
import Contacts from './Pages/Contact/Contacts'
import Login from './Pages/LoginClient/Login'
import UserProfile from './Pages/UserProfile/UserProfile'

function App() {
  return (
    <>
      <ScrollToTop />
      {/* Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetailCard />} />
        <Route path="/quotes" element={<QuoteForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/26062025" element={<LoginAdmin />} />
        <Route path="/profile" element={<UserProfile />} />
        {/* <Route path="/26062025/admin" element={<ControlAdmin />} /> */}
        <Route path="/login" element={<Login />} />
        < Route element={< PrivateRoutes />}>
          <Route path="/26062025/admin" element={<ControlAdmin />} />
        </Route >

      </Routes>
      <div className="fixed right-10 bottom-10">
        <WPbutton />
      </div>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default App

