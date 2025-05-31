const openNp = document.querySelector('#open-modal-np');
const npDialog = document.querySelector('#np-dialog');
const closeBtn = document.querySelector('#close-modal');

const openGold = document.querySelector('#open-modal-gold');
const goldDialog = document.querySelector('#gold-dialog');
const closeGold = document.querySelector('#close-gold');

const openSilver = document.querySelector('#open-modal-silver');
const silverDialog = document.querySelector('#silver-dialog');
const closeSilver = document.querySelector('#close-silver');

const openBronze = document.querySelector('#open-modal-bronze');
const bronzeDialog = document.querySelector('#bronze-dialog');
const closeBronze = document.querySelector('#close-bronze');

openNp.addEventListener('click', () => npDialog.showModal());
closeBtn.addEventListener('click', () => npDialog.close());

openGold.addEventListener('click', () => goldDialog.showModal());
closeGold.addEventListener('click', () => goldDialog.close());

openSilver.addEventListener('click', () => silverDialog.showModal());
closeSilver.addEventListener('click', () => silverDialog.close());

openBronze.addEventListener('click', () => bronzeDialog.showModal());
closeBronze.addEventListener('click', () => bronzeDialog.close());
