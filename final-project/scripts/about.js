

  const hamburgerElement = document.querySelector('#myButton');
  const navElement = document.querySelector('#animate-menu');

  hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
  });


const openAgent1 = document.querySelector('#open-modal-np');
const agent1Dialog = document.querySelector('#np-dialog');
const closeAgent1 = document.querySelector('#close-modal');

openAgent1.addEventListener('click', () => {
  agent1Dialog.showModal();
});

closeAgent1.addEventListener('click', () => {
  agent1Dialog.close();
});

const openAgent2 = document.querySelector('#open-modal-lm');
const agent2Dialog = document.querySelector('#lm-dialog');
const closeAgent2 = document.querySelector('#close-lm');

openAgent2.addEventListener('click', () => {
  agent2Dialog.showModal();
});

closeAgent2.addEventListener('click', () => {
  agent2Dialog.close();
});

const openAgent3 = document.querySelector('#open-modal-mg');
const agent3Dialog = document.querySelector('#mg-dialog');
const closeAgent3 = document.querySelector('#close-mg');

openAgent3.addEventListener('click', () => {
  agent3Dialog.showModal();
});

closeAgent3.addEventListener('click', () => {
  agent3Dialog.close();
});