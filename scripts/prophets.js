const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {  //Create a async defined function named "getProphetData" t
    const response = await fetch(url); // fetch data from the JSON source url using the await fetch() method.
    const data = await response.json(); //Store the response and convert from the fetch() method in a const variable
    //console.table(data.prophets);
    displayProphets(data.prophets); 
}

getProphetData(); // Call the function to fetch the data

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
    
    let card = document.createElement('section');
    let fullName = document.createElement('H2');
    let portrait = document.createElement('img');

    
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; // Build the h2 content out to show the prophet's full name
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${fullName}`);
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '100');
    portrait.setAttribute('height', '100');

    // Append the section(card) with the created elements
    card.appendChild(fullName);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); // end of arrow function and forEach loop    
}