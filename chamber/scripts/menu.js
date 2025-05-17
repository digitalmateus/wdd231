const hamburgerElement = document.getElementById('hamb-icon');
const xIconElement = document.getElementById('x-icon');
const navBarElement = document.getElementById('navBar');

hamburgerElement.addEventListener('click', () =>
    toggleMenu()
);

xIconElement.addEventListener('click', () =>
    toggleMenu()
);

function toggleMenu() {
    hamburgerElement.classList.toggle('show');
    xIconElement.classList.toggle('show');
    navBarElement.classList.toggle('show');
}