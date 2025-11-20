// registro.js

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const passwordInput = document.getElementById('passwordInput');
    const nextButton = document.getElementById('nextButton');

    // Función que verifica si ambos campos están llenos
    const checkInputs = () => {
        // Trim() elimina espacios en blanco al inicio y al final
        const isUserFilled = userInput.value.trim().length > 0;
        const isPasswordFilled = passwordInput.value.trim().length > 0;

        // Habilita el botón solo si ambos campos tienen contenido
        nextButton.disabled = !(isUserFilled && isPasswordFilled);
    };

    // Escucha eventos de entrada en ambos campos
    userInput.addEventListener('input', checkInputs);
    passwordInput.addEventListener('input', checkInputs);

    // Lógica al hacer clic en el botón (Redirección)
    nextButton.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Simulación de proceso de registro exitoso

        alert("Registro exitoso. Redirigiendo a Iniciar Sesión...");
        
        // Aquí deberías redirigir a la pantalla de Login.
        // Como tu diseño parece ser una única pantalla de 'Iniciar Sesion',
        // usaremos el Dashboard como destino temporal o una nueva pantalla de login.
        
        // **OPCION 1: Redirigir al Dashboard (si el registro te lleva a la app)**
        // window.location.href = 'dashboard.html';

        // **OPCION 2: Redirigir a una pantalla de Login (para un flujo de 2 pasos)**
        window.location.href = 'login.html'; // Usaremos 'login.html' como destino
    });

    // Aseguramos que el botón esté deshabilitado al cargar (ya lo está en el HTML, pero es buena práctica)
    nextButton.disabled = true;
});