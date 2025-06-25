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
      </Routes>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
