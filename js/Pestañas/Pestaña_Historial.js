
function generarPanelesHistorial() {
    const panelesHistorial = [
        { id: 'historialPanel1', titulo: 'Historial de Proyectos' },
        { id: 'historialPanel2', titulo: 'Historial Panel 2' },
        { id: 'historialPanel3', titulo: 'Historial Panel 3' },
    ];

    return panelesHistorial.map(panel => `
    <div id="${panel.id}" class="panel">
      <div class="panel-bar">
        <img src="" alt="" class="panel-logo" id="${panel.id}_logo">
        <div class="panel-bar-text-container">
          <div class="panel-bar-text" id="${panel.id}_pinText">${panel.titulo}</div>
        </div>
      </div>
      <div class="panel-content">
        <div class="panel-section">
          <h3>Imágenes</h3>
          <div class="gallery" id="${panel.id}_imagenes">
            <!-- Aquí se añadirán las imágenes -->
          </div>
        </div>
        <div class="panel-section">
          <h3>Reels</h3>
          <div class="gallery" id="${panel.id}_reels">
            <!-- Aquí se añadirán los reels -->
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function asignarLogosHistorial() {
    const logoMap = {
        'historialPanel1_logo': 'Imagenes\\LOG_PANEL\\Autodesk-Revit-logo.png',
    };

    for (const [logoId, logoUrl] of Object.entries(logoMap)) {
        const logoElement = document.getElementById(logoId);
        if (logoElement) {
            logoElement.src = logoUrl;
            logoElement.style.display = 'block'; // Mostrar el logo si hay una URL asignada
        }
    }
}

function agregarImagenesHistorial() {
    const imagenesPanel1 = [
        'Imagenes\\Imagen1.png',
        'Imagenes\\Imagen2.png',
        'Imagenes\\Imagen3.webp',
        'Imagenes\\Imagen4.webp'
    ];

    const imagenesPanel2 = [
        'Imagenes\\Imagen4.webp',
        'Imagenes\\Imagen5.webp',
        'Imagenes\\Imagen6.webp',
        'Imagenes\\Imagen7.webp'
    ];

    const imagenesPanel3 = [
        'Imagenes\\Imagen8.webp',
        'Imagenes\\Imagen9.webp'
    ];

    agregarImagenesAUnPanel('historialPanel1', imagenesPanel1);
    agregarImagenesAUnPanel('historialPanel2', imagenesPanel2);
    agregarImagenesAUnPanel('historialPanel3', imagenesPanel3);
}

function agregarImagenesAUnPanel(panelId, imagenes) {
    const imagenContainer = document.getElementById(`${panelId}_imagenes`);
    if (imagenContainer) {
        imagenes.forEach(imagenUrl => {
            const imgElement = document.createElement('img');
            imgElement.src = imagenUrl;
            imgElement.alt = `Imagen de ${panelId}`;
            imgElement.classList.add('thumbnail');
            imgElement.onclick = () => mostrarEnGrande(imagenUrl, 'image');
            imagenContainer.appendChild(imgElement);
        });
    }
}

function agregarVideosReelsHistorial() {
    const VideoPanel1 = [
        'Videos\\Video1.mp4',
    ];
    const VideoPanel2 = [
        'Videos\\Video2.mp4',
    ];

    agregarVideosAUnPanel('historialPanel1', VideoPanel1);
    agregarVideosAUnPanel('historialPanel2', VideoPanel2);
}

function agregarVideosAUnPanel(panelId, videos) {
    const videoContainer = document.getElementById(`${panelId}_reels`);
    if (videoContainer) {
        videos.forEach(videoUrl => {
            const videoElement = document.createElement('video');
            videoElement.src = videoUrl;
            videoElement.controls = false; // Desactivar controles en el video original
            videoElement.classList.add('styled-video');
            videoElement.onclick = () => mostrarEnGrande(videoUrl, 'video', videoElement);
            videoContainer.appendChild(videoElement);
        });
    }
}

function mostrarEnGrande(url, tipo, originalElement) {
    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox');
    lightbox.onclick = (e) => {
        if (e.target === lightbox) {
            if (originalElement) {
                originalElement.muted = false; // Activar sonido del video original
                originalElement.pause(); // Pausar el video original
            }
            document.body.removeChild(lightbox);
        }
    };

    const content = document.createElement(tipo === 'image' ? 'img' : 'video');
    content.src = url;
    if (tipo === 'video') {
        content.controls = true;
        content.autoplay = true;
        content.currentTime = originalElement.currentTime; // Sincronizar tiempo del video
        content.onplay = () => {
            if (originalElement) {
                originalElement.muted = true; // Silenciar video original
                originalElement.currentTime = content.currentTime; // Sincronizar tiempo del video
                originalElement.pause(); // Asegurarse de que el video original está pausado
            }
        };
        content.onpause = () => {
            if (originalElement) {
                originalElement.muted = false; // Activar sonido del video original
                originalElement.pause(); // Asegurarse de que el video original está pausado
            }
        };
        content.ontimeupdate = () => {
            if (originalElement) {
                originalElement.currentTime = content.currentTime; // Sincronizar tiempo del video
            }
        };
    }

    const downloadButton = document.createElement('a');
    downloadButton.href = url;
    downloadButton.download = '';
    downloadButton.classList.add('download-button');
    downloadButton.textContent = 'Descargar';

    lightbox.appendChild(content);
    lightbox.appendChild(downloadButton);
    document.body.appendChild(lightbox);
}

