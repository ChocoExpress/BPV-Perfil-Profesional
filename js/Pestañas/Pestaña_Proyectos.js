function generarPanelesPorDefecto() {
    const paneles = [
        { id: 'panel1', titulo: 'Proyectos de Revit', burbujas: ['Cabaña1', 'Cabaña2', 'Cabaña3', 'Cabaña4', 'Cabaña5'] },
        { id: 'panel2', titulo: 'Panel 2', burbujas: ['Texto 2.1', 'Texto 2.2', 'Texto 2.3'] },
        { id: 'panel3', titulo: 'Panel 3', burbujas: ['Texto 3.1', 'Texto 3.2', 'Texto 3.3'] },
    ];

    return paneles.map(panel => `
    <div id="${panel.id}" class="panel">
      <div class="panel-bar">
        <img src="" alt="" class="panel-logo" id="${panel.id}_logo">
        <div class="panel-bar-text-container">
          <div class="panel-bar-text" id="${panel.id}_pinText">${panel.titulo}</div>
        </div>
      </div>
      <div class="bubble-container" id="${panel.id}_bubbleContainer">
        ${panel.burbujas.map((texto, index) => `
          <div class="bubble" id="${panel.id}_bubble${index + 1}" onclick="abrirPDF('${panel.id}_bubble${index + 1}')">
            <div class="bubble-text" id="${panel.id}_text${index + 1}">${texto}</div>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');
}

function asignarPDFs() {
    const pdfMap = {
        'panel1_bubble1': 'PDF\\cabaña.pdf'
    };

    for (const [bubbleId, pdfUrl] of Object.entries(pdfMap)) {
        document.getElementById(bubbleId).setAttribute('data-pdf-url', pdfUrl);
    }
}

function asignarImagenes() {
    const imageMap = {
        'panel1_bubble1': 'Imagenes\\LOG_BURBUJAS\\cabaña_pru-1.png',
        'panel1_bubble2': 'Imagenes\\LOG_BURBUJAS\\cabaña_pru-2.png',
        'panel1_bubble3': 'Imagenes\\LOG_BURBUJAS\\cabaña_pru-3.png',
        'panel1_bubble4': 'Imagenes\\LOG_BURBUJAS\\cabaña_pru-4.png',
        'panel1_bubble5': 'Imagenes\\LOG_BURBUJAS\\cabaña_pru-5.png'
    };

    for (const [bubbleId, imageUrl] of Object.entries(imageMap)) {
        const bubble = document.getElementById(bubbleId);
        bubble.innerHTML = `<img src="${imageUrl}" alt="Imagen de ${bubbleId}">`;
    }
}

function asignarLogos() {
    const logoMap = {
        'panel1_logo': 'Imagenes\\LOG_PANEL\\Autodesk-Revit-logo.png'
    };

    for (const [logoId, logoUrl] of Object.entries(logoMap)) {
        const logoElement = document.getElementById(logoId);
        logoElement.src = logoUrl;
        logoElement.style.display = 'block'; // Mostrar el logo si hay una URL asignada
    }
}

function abrirPDF(bubbleId) {
    const bubble = document.getElementById(bubbleId);
    const pdfUrl = bubble.getAttribute('data-pdf-url');
    if (pdfUrl) {
        mostrarLightbox(pdfUrl);
    }
}

function mostrarLightbox(pdfUrl) {
    const lightbox = document.getElementById('pdfLightbox');
    const pdfFrame = document.getElementById('pdfFrame');
    pdfFrame.src = pdfUrl;
    lightbox.style.display = 'flex';
}

function cerrarLightbox() {
    const lightbox = document.getElementById('pdfLightbox');
    lightbox.style.display = 'none';
    const pdfFrame = document.getElementById('pdfFrame');
    pdfFrame.src = ''; // Limpiar el src del iframe para detener la carga del PDF
}

document.addEventListener('DOMContentLoaded', () => {
    const lightbox = document.getElementById('pdfLightbox');
    if (lightbox) {
        lightbox.style.display = 'none'; // Asegurarse de que el lightbox esté oculto al cargar la página

        // Añadir evento de clic para cerrar el lightbox al hacer clic fuera del contenido
        lightbox.addEventListener('click', cerrarLightbox);
    }
});
