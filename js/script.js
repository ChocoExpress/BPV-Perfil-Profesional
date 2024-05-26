document.addEventListener('DOMContentLoaded', () => {
    cambiarContenido(); // Cargar el contenido de inicio
});

function toggleMenu() {
    var menu = document.getElementById('menu');
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
}

function cambiarContenido(seccion) {
    var contenido = document.getElementById('contenidoPrincipal');
    switch (seccion) {
        case 'Proyectos':
            contenido.innerHTML = `
                <h2>Proyectos</h2>
                ${generarPanelesPorDefecto()}
            `;
            asignarPDFs();
            asignarImagenes();
            asignarLogos();
            break;
        case 'Historial':
            contenido.innerHTML = `
                <h2>Historial</h2>
                ${generarPanelesHistorial()}
            `;
            asignarLogosHistorial();
            agregarImagenesHistorial();
            agregarVideosReelsHistorial();
            break;
        case 'acerca':
            contenido.innerHTML = `
                <h2>Acerca de</h2>
                <p>Conoce más sobre nuestra empresa y nuestra historia.</p>
            `;
            break;
        case 'contacto':
            contenido.innerHTML = `
                <h2>Contacto</h2>
                <p>¡Contáctanos! Estamos aquí para responder a tus preguntas.</p>
            `;
            break;
        default:
            contenido.innerHTML = generarContenidoPrincipal();
            break;
    }
}
