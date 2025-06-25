import { useEffect } from 'react';
import { useLocation } from 'react-router'; // <--- Importa desde 'react-router'

function ScrollToTop() {
    const { pathname } = useLocation(); // Obtiene la ruta actual de la URL

    // Este efecto se ejecuta cada vez que 'pathname' cambia
    useEffect(() => {
        // Desplaza la ventana a la esquina superior izquierda
        window.scrollTo(0, 0);
    }, [pathname]); // Dependencia: el efecto se vuelve a ejecutar cuando la ruta cambia

    return null; // Este componente no renderiza nada visualmente
}

export default ScrollToTop;