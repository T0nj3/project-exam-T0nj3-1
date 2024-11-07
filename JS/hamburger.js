document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector('.hamburger');
    const sideMenu = document.getElementById('sideMenu');
    const closeMenu = document.querySelector('.close');

    hamburger.addEventListener('click', () => {
        sideMenu.classList.toggle('open');
        sideMenu.style.display = sideMenu.classList.contains('open') ? 'flex' : 'none';
    });

    closeMenu.addEventListener('click', () => {
        sideMenu.classList.remove('open');
        sideMenu.style.display = 'none'; 
    });
});