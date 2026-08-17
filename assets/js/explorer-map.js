'use strict';

/**
 * Aquaway Tours - Interactive Red Sea Explorer Map
 * Focus: Hurghada and surrounding Red Sea highlights.
 */

const RED_SEA_COORDS = {
    "orange-bay": [27.239, 33.916],
    "dolphin-house": [27.369, 33.874],
    "super-safari": [27.218, 33.722],
    "pyramids": [29.979, 31.134],
    "luxor": [25.687, 32.639],
    "speed-boat": [27.228, 33.844],
    "diving": [27.265, 33.864],
    "mini-safari": [27.208, 33.712],
    "city-tour": [27.225, 33.834],
    "parasailing": [27.215, 33.844],
    "hula-hula": [27.1895, 33.9312],
    "camel-riding": [27.200, 33.700],
    "horse-riding": [27.210, 33.710],
    "spa": [27.218, 33.824],
    "nefertari": [27.228, 33.844],
    "medical-care": [27.230, 33.830],
    "paradise-island": [27.2173, 33.9161],
    "hula-hula-sunset": [27.1895, 33.9312],
    "island-bianka": [26.1285, 34.3012],
    "safari-stars": [27.2048, 33.6821]
};

function initExplorerMap() {
    const mapEl = document.getElementById('sinai-map'); // Keeping ID for compatibility
    if (!mapEl) return;

    // Centered on the Red Sea / Hurghada
    const map = L.map('sinai-map', {
        center: [27.22, 33.85],
        zoom: 11,
        scrollWheelZoom: false,
        zoomControl: false
    });

    // Dark Mode Tiles
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
        subdomains: 'abcd',
        maxZoom: 20
    }).addTo(map);

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    // Custom Gold Marker Icon
    const goldIcon = L.divIcon({
        className: 'red-sea-marker',
        html: `<div class="marker-pulse"></div><div class="marker-dot"></div>`,
        iconSize: [24, 24],
        iconAnchor: [12, 12]
    });

    // Add Markers from TRIPS data
    if (typeof TRIPS !== 'undefined') {
        TRIPS.forEach(trip => {
            const coords = RED_SEA_COORDS[trip.slug];
            if (coords) {
                const marker = L.marker(coords, { icon: goldIcon }).addTo(map);
                
                const name = getLang(trip.name);
                const isSub = window.location.pathname.includes('/trips/');
                const link = isSub ? `${trip.slug}.html` : `trips/${trip.slug}.html`;
                
                const popupContent = `
                    <div class="map-popup-v1">
                        <div class="popup-img-v0">
                            <img src="${isSub ? '../' + trip.img : trip.img}" alt="${name}">
                        </div>
                        <div class="popup-content-v0">
                            <span class="popup-cat">${trip.cat}</span>
                            <h3 class="popup-title">${name}</h3>
                            <a href="${link}" class="btn-popup">View Tour Details</a>
                        </div>
                    </div>
                `;
                
                marker.bindPopup(popupContent, {
                    className: 'elite-leaflet-popup',
                    closeButton: false,
                    offset: [0, -10],
                    minWidth: 200
                });
            }
        });
    }

    window.addEventListener('resize', () => map.invalidateSize());
}

// Injected Styles for the Red Sea Explorer
const mapStyles = `
.red-sea-marker {
    display: flex; align-items: center; justify-content: center;
}
.marker-pulse {
    position: absolute; width: 40px; height: 40px; border-radius: 50%;
    background: rgba(212, 175, 55, 0.4);
    animation: pulseMap 1.5s infinite;
}
.marker-dot {
    position: absolute; width: 10px; height: 10px; border-radius: 50%;
    background: #d4af37; border: 2px solid #fff; z-index: 2;
}
@keyframes pulseMap {
    0% { transform: scale(0.5); opacity: 1; }
    100% { transform: scale(2.5); opacity: 0; }
}
.elite-leaflet-popup .leaflet-popup-content-wrapper {
    background: rgba(15, 20, 26, 0.95); backdrop-filter: blur(15px);
    border: 1px solid #d4af37; border-radius: 16px; padding: 0px; color: #fff;
    min-width: 200px; overflow: hidden;
    box-shadow: 0 10px 40px rgba(0,0,0,0.6);
}
.elite-leaflet-popup .leaflet-popup-tip {
    background: #d4af37;
}
.map-popup-v1 { display: flex; flex-direction: column; width: 100%; border-radius: 16px; }
.popup-img-v0 { 
    width: 100%; height: 120px; 
    border-bottom: 2px solid #d4af37;
    overflow: hidden; 
}
.popup-img-v0 img { 
    width: 100%; height: 100%; object-fit: cover; 
    transition: transform 0.6s ease;
}
.elite-leaflet-popup:hover .popup-img-v0 img {
    transform: scale(1.1);
}
.popup-content-v0 { padding: 15px; text-align: center; }
.popup-cat { font-size: 10px; text-transform: uppercase; color: #d4af37; font-weight: 700; letter-spacing: 1px; }
.popup-title { font-size: 16px; margin: 8px 0 15px; font-family: 'Playfair Display', serif; color: #fff; font-weight: 700; }
.btn-popup { 
    display: inline-block; padding: 10px 20px; background: #d4af37; color: #000; 
    text-decoration: none; border-radius: 8px; font-size: 11px; font-weight: 800;
    transition: 0.3s; text-transform: uppercase;
}
.btn-popup:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4); }

#sinai-map { transition: all 0.4s ease; }
.elite-map-wrapper:hover #sinai-map {
    border-color: rgba(212, 175, 55, 1) !important;
    box-shadow: 0 0 40px rgba(212, 175, 55, 0.6) !important;
}
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = mapStyles;
document.head.appendChild(styleSheet);

document.addEventListener('DOMContentLoaded', () => {
    const checkTrips = setInterval(() => {
        if (typeof TRIPS !== 'undefined') {
            initExplorerMap();
            clearInterval(checkTrips);
        }
    }, 100);
});

