// map.js

let map;

/**
 * Inicializa el mapa. Esta función es llamada automáticamente 
 * por la API de Google Maps después de cargar el script.
 */
function initMap() {
    
    // Si el navegador soporta Geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                };
                
                // 1. Crear la instancia del mapa centrado en la ubicación del usuario
                map = new google.maps.Map(document.getElementById("map"), {
                    center: userLocation,
                    zoom: 16, 
                    mapTypeControl: false,
                    streetViewControl: false,
                });

                // 2. Colocar un marcador en la ubicación del usuario
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: "Mi Ubicación de Emergencia",
                });
                
                // 3. Actualizar la descripción del Paso 1
                const step1Desc = document.querySelector('#step1 .step-description');
                if (step1Desc) {
                    step1Desc.textContent = `GPS: Localizado en (${userLocation.lat.toFixed(6)}, ${userLocation.lng.toFixed(6)}) - ¡Ubicación confirmada!`;
                    // Habilitar el botón después de confirmar la ubicación (Paso 1 completado)
                    document.getElementById('nextStepButton').disabled = false;
                }
            },
            () => {
                handleLocationError(true);
            }
        );
    } else {
        // El navegador no soporta Geolocation
        handleLocationError(false);
    }
}

function handleLocationError(browserHasGeolocation) {
    const defaultLocation = { lat: -33.4489, lng: -70.6693 }; // Fallback: Santiago, Chile
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLocation,
        zoom: 12,
    });
    
    const step1Desc = document.querySelector('#step1 .step-description');
    if (step1Desc) {
        step1Desc.textContent = "Error: Ubicación no disponible. Por favor, revisa tus permisos.";
    }
    
    // Deshabilitar el botón si la ubicación no se puede obtener, forzando al usuario a arreglarlo
    document.getElementById('nextStepButton').disabled = true; 
    console.error(browserHasGeolocation
        ? "Error: El servicio de Geolocalización falló o fue denegado."
        : "Error: Tu navegador no soporta Geolocalización.");
}