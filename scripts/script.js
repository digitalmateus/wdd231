const currentYear = new Date().getFullYear();
const lastModified = document.lastModified; 

const btnAll = document.getElementById('btn-all');
const btnCse = document.getElementById('btn-cse');
const btnWdd = document.getElementById('btn-wdd');

const cse110 = document.getElementById('cse110');
const wdd130 = document.getElementById('wdd130');
const cse111 = document.getElementById('cse111');
const cse210 = document.getElementById('cse210');
const wdd131 = document.getElementById('wdd131');
const wdd231 = document.getElementById('wdd231');

btnAll.addEventListener('click', function() {
    cse110.style.backgroundColor = 'dark gray';
    cse111.style.backgroundColor = 'dark gray';
    cse210.style.backgroundColor = 'dark gray';
    wdd130.style.backgroundColor = 'dark gray';
    wdd131.style.backgroundColor = 'dark gray';
    wdd231.style.backgroundColor = 'dark gray';
});

btnCse.addEventListener('click', function() {
    
    cse110.style.backgroundColor = 'black';
    cse111.style.backgroundColor = 'black';
    cse210.style.backgroundColor = 'black';
    wdd130.style.backgroundColor = 'dark gray';
    wdd131.style.backgroundColor = 'dark gray';
    wdd231.style.backgroundColor = 'dark gray';
});

btnWdd.addEventListener('click', function() {
    cse110.style.backgroundColor = 'dark gray';
    cse111.style.backgroundColor = 'dark gray';
    cse210.style.backgroundColor = 'dark gray';
    wdd130.style.backgroundColor = 'black';
    wdd131.style.backgroundColor = 'black';
    wdd231.style.backgroundColor = 'black';
});


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("currentYear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = document.lastModified;
});