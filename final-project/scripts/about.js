

  const hamburgerElement = document.querySelector('#myButton');
  const navElement = document.querySelector('#animate-menu');

  hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
  });
