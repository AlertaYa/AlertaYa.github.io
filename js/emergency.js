// emergency.js

document.addEventListener('DOMContentLoaded', () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const nextStepButton = document.getElementById('nextStepButton');
    let currentStepIndex = 0;

    // Inicia en 1 porque el paso 0 (GPS) se maneja en map.js
    const stepsWithInput = [
        { id: 'step2', input: document.getElementById('input2') }, 
        { id: 'step3', input: null }, // Paso 3 es solo confirmación de datos, no input directo
        { id: 'step4', input: document.getElementById('input4') },
        { id: 'step5', input: document.getElementById('input5') },
        { id: 'step6', input: document.getElementById('cameraInput'), isSpecial: true } // Paso 6 es la cámara
    ];

    // --- FUNCIÓN DE UTILIDAD ---

    // Determina si el paso actual ha sido completado
    const isCurrentStepValid = () => {
        // El Paso 1 (GPS) siempre se considera válido inicialmente
        if (currentStepIndex === 0) return true; 

        const stepData = stepsWithInput[currentStepIndex - 1]; 
        
        if (stepData.isSpecial) {
            // Para el paso de la cámara, solo necesita estar activo para avanzar
            return true;
        }
        
        // Para pasos con input (teléfono, descripción, estado)
        if (stepData.input) {
            return stepData.input.value.trim() !== '';
        }
        
        // Para el paso 3 (Datos), solo requiere un clic para confirmar
        return currentStepIndex === 2; 
    };

    // --- MANEJO DE PASOS ---

    const updateUI = () => {
        // Desactiva el botón si el paso no es válido
        nextStepButton.disabled = !isCurrentStepValid(); 

        timelineItems.forEach((item, index) => {
            const isCurrent = index === currentStepIndex;
            const isCompleted = index < currentStepIndex;
            
            item.classList.remove('active-step');
            item.classList.remove('completed-step');
            
            if (isCurrent) {
                item.classList.add('active-step');
            } else if (isCompleted) {
                item.classList.add('completed-step');
            }
            
            // Ocultar/Mostrar inputs
            const stepData = stepsWithInput[index - 1];
            if (stepData && stepData.input) {
                const inputElement = stepData.input;
                const labelElement = item.querySelector('.input-label');
                const containerElement = item.querySelector('.camera-control-container');

                // Ocultar todos los inputs por defecto
                inputElement.classList.add('hidden-input');
                if (containerElement) containerElement.classList.add('hidden-input');

                // Si es el paso actual, mostrar el input/contenedor
                if (isCurrent) {
                    labelElement.style.display = 'none';
                    if (stepData.isSpecial) {
                        if (containerElement) containerElement.classList.remove('hidden-input');
                    } else {
                        inputElement.classList.remove('hidden-input');
                        inputElement.focus();
                    }
                } else {
                    labelElement.style.display = 'block';
                }
            }
        });
    };

    const nextStep = () => {
        if (!isCurrentStepValid()) {
            return;
        }

        if (currentStepIndex < timelineItems.length - 1) {
            currentStepIndex++;
            updateUI();
        } else {
            // Último paso: enviar reporte
            alert('¡Reporte de emergencia enviado con éxito! Redirigiendo a la confirmación.');
            window.location.href = 'confirmation.html';
        }
    };

    // --- EVENT LISTENERS ---

    nextStepButton.addEventListener('click', nextStep);

    // Escucha la entrada en los campos para habilitar el botón
    stepsWithInput.forEach(step => {
        if (step.input && !step.isSpecial) {
            step.input.addEventListener('input', updateUI);
        }
    });

    // Manejo de clic en el botón de la cámara (Paso 6)
    const openCameraButton = document.getElementById('openCameraButton');
    const cameraInput = document.getElementById('cameraInput');
    const fileStatus = document.getElementById('fileStatus');

    if (openCameraButton) {
        openCameraButton.addEventListener('click', () => {
            cameraInput.click();
        });
    }

    if (cameraInput) {
        cameraInput.addEventListener('change', () => {
            if (cameraInput.files.length > 0) {
                fileStatus.textContent = `Archivo adjuntado: ${cameraInput.files[0].name}`;
                // Como ya tiene el archivo, habilitamos el botón para el último paso
                nextStepButton.disabled = false; 
            } else {
                fileStatus.textContent = 'No se ha adjuntado ningún archivo.';
                nextStepButton.disabled = true;
            }
        });
    }

    // El Paso 1 (GPS) es especial: su validación se maneja en map.js (al obtener la ubicación)
    // El botón se habilita por defecto porque GPS es el primer paso activo.
    updateUI(); 
});