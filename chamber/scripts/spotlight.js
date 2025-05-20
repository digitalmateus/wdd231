const spotlightDiv = document.querySelector('#spotlight');

async function loadSpotlights() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    const members = data.companies;

    
    const qualified = members.filter(m => 
        m.membership.toLowerCase() === 'gold' || m.membership.toLowerCase() === 'silver'
    );

    const shuffled = qualified.sort(() => 0.5 - Math.random());
    const count = Math.floor(Math.random() * 2) + 2; // 2 ou 3
    const selected = shuffled.slice(0, count);

    selected.forEach(company => {
        const card = document.createElement('section');
        const logo = document.createElement('img');
        const name = document.createElement('h4');
        const phone = document.createElement('p');
        const address = document.createElement('p');
        const web = document.createElement('p');
        const membership = document.createElement('p');

        logo.setAttribute('src', company.imageurl);
        logo.setAttribute('alt', `Logo of ${company.compname}`);
        logo.setAttribute('loading', 'lazy');

        name.textContent = company.compname;
        phone.textContent = `Phone: ${company.phone}`;
        address.textContent = `Address: ${company.address}`;
        web.innerHTML = `Website: <a href="${company.web}" target="_blank">${company.web}</a>`;
        membership.textContent = `Membership Level: ${company.membership}`;

        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(phone);
        card.appendChild(address);
        card.appendChild(web);
        card.appendChild(membership);

        spotlightDiv.appendChild(card);
    });
}

loadSpotlights();