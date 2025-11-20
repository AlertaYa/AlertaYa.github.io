// menu.js
document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const openMenuButton = document.getElementById('openMenu');
    const closeMenuButton = document.getElementById('closeMenu');

    // Función para abrir el menú
    if (openMenuButton) {
        openMenuButton.addEventListener('click', () => {
            sidebar.classList.add('open');
        });
    }

    // Función para cerrar el menú
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', () => {
            sidebar.classList.remove('open');
        });
    }
});