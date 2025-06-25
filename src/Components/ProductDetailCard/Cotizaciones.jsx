import { Link } from "react-router"

export default function Cotizaciones() {
    return (
        <div className='bg-white rounded-xl flex shadow-gray-900 w-[80%] py-3 px-10'>
            <div className='w-md flex items-center pr-15'>
                <img src="https://miroytengo.es/blog/wp-content/uploads/403-2.jpg" alt="herramientas" className='rounded-xl' />
            </div>
            <div className='lg:w-[50%] flex flex-col '>
                <h3 className='font-bold text-3xl'>¿Deseas realizar una cotizacion?</h3>
                <div className='pl-10'>
                    <br />
                    <ul>Contactanos si deseas modificar:</ul>
                    <li>El material</li>
                    <li>El acabado</li>
                    <li>Las dimensiones</li>
                    <li>Por volúmen

                    </li>
                    <li>O tienes un diseño que quieres que te coticemos</li>
                </div>
            </div>
            <div className='justify-center items-center flex lg:w-[300px]'>
                <Link to='/quotes'>
                    <button className="flex-1 bg-[#431f0a] hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105 w-[300px] sm:w-auto">
                        Cotizaciones
                    </button>
                </Link>
            </div>
        </div>
    )
}
