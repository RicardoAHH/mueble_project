"use client"

import { useState } from "react"
import { Link } from "react-router"

export default function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const carouselImages = [
    {
      src: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      alt: "Sala moderna elegante",
      title: "Transforma tu hogar",
      subtitle: "Descubre nuestra nueva colección",
    },
    {
      src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      alt: "Dormitorio acogedor",
      title: "Espacios de descanso",
      subtitle: "Comodidad y estilo en cada detalle",
    },
    {
      src: "https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=500&q=80",
      alt: "Comedor familiar",
      title: "Momentos especiales",
      subtitle: "Muebles que unen a la familia",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
  }

  return (
    <section className="relative h-96 md:h-[500px] overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
            }`}
        >
          <img src={image.src || "/placeholder.svg"} alt={image.alt} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{image.title}</h2>
              <p className="text-xl md:text-2xl mb-8">{image.subtitle}</p>
              <Link to='/products'>
                <button className="bg-[#431f0a] hover:bg-blue-700 text-white border-1 border-white/10 font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105">
                  Ver Catálogo
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Controles del carrusel */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
      >
        <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300 hover:scale-110"
      >
        <svg className="h-6 w-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? "bg-white scale-125" : "bg-white bg-opacity-50 hover:bg-opacity-75"
              }`}
          />
        ))}
      </div>
    </section>
  )
}
