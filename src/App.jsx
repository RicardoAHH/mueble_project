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
        <Route path="/26062025" element={<LoginAdmin />} />
        <Route element={<PrivateRoutes />}>
          {/* La ruta "/26062025/admin" ahora está protegida.
              Solo se renderizará <ControlAdmin /> si PrivateRoutes lo permite (si hay token). */}
          <Route path="/26062025/admin" element={<ControlAdmin />} />
          {/* Si tienes más rutas de administración (ej. /26062025/admin/productos),
              las pondrías aquí como rutas anidadas dentro de PrivateRoutes. */}
        </Route>
      </Routes>
      {/* Footer */}
      <Footer />
    </>
  )
}

export default App
