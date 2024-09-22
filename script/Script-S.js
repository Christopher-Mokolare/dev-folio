// **************** Menu Toggle****************
let navbar = document.querySelector('.navbar');
let menu_open = document.getElementById('open-menu-icon');
let menu_close = document.getElementById('close-menu-icon');

function toggleMenu() {
    if (window.innerWidth <= 767) {
        if (navbar.style.display === 'flex') {
            navbar.style.display = 'none';
            menu_open.style.display = 'block';
            menu_close.style.display = 'none';
        } else {
            navbar.style.display = 'flex';
            menu_open.style.display = 'none';
            menu_close.style.display = 'block';
        }
    }
}

menu_open.addEventListener('click', toggleMenu);
menu_close.addEventListener('click', toggleMenu);

// Optionally, reset navbar display on resize
window.addEventListener('resize', () => {
      
    if (window.innerWidth > 767) {
        navbar.style.display = 'flex';
        menu_open.style.display = 'none';
        menu_close.style.display = 'none';
    } else {
        navbar.style.display = 'none';
        menu_open.style.display = 'block';
    }
});
// ****************END****************

// ****************Button back****************
function goBack() {
    window.history.back();
}
// ****************END****************