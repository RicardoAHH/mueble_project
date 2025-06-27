import React from 'react'

export default function About() {
    return (
        <div className='pt-20 bg-[#F8F5EE]'>
            <div className='w-full flex flex-col items-center justify-center'>
                <h1 className='text-3xl font-bold'>Carpinteria Hernández</h1>
                <h2>Muebles de calidad hechos de forma artesanal</h2>
                <h3>Cada mueble es único</h3>
            </div>
            <div className='flex flex-col'>
                <h4 className='font-bold pb-5 pl-20 text-xl'>¿Quienes Somos?</h4>
                <div className='flex gap-5 px-20'>
                    <img className='w-[350px] ' src="https://leccionamexico.b-cdn.net/wp-content/uploads/2021/11/curso-online-carpinteria_l_primaria_1.jpg" alt="foto1" />
                    <p className='pt-10 text-lg font-semibold'>Somos carpinteros que trabajamos muebles sobre diseño y de forma artesanal desde hace mas de 40 años bajo el liderazgo del maestro Miguel Hernández, trabajamos a la necesidades del cliente adaptando los muebles con el diseño, madera, medidas y acabado que necesitan. Desde estilos modernos hasta estilos rústicos, el límite ha estado en la imaginación del cliente.</p>
                </div>
            </div>
            <div className='flex flex-col'>

                <h4 className='font-bold pb-5 text-right pr-40 text-xl'>Nuestra Experiencia</h4>

                <div className='flex gap-5 px-20'>
                    <p className='pt-10 text-lg font-semibold'>En los as de 40 años de experiencia hemos trabajado a lo largo de toda la república mexicana, realizando muebles para variedad de clientes, hemos hecho muebles para empresas como Liverpool, Sears y Palacio de Hierro. Tambien hemos elaborado muebles para marcas como Michel Dommit...</p>
                    <img className='w-[350px]' src="https://static.vecteezy.com/system/resources/previews/023/498/272/non_2x/carpenters-at-workshop-with-carpentry-tools-vector.jpg" alt="foto2" />
                </div>

            </div>

            <h4 className='font-bold pb-5 pl-40 text-xl'>Nuestros Valores</h4>
        </div >
    )
}
