const url = './data/members.json';
const cards = document.querySelector('#cards');

async function getCompanyInfo() {
    const response = await fetch(url);
    const data = await response.json();
    displayCompanies(data.companies);
}

getCompanyInfo();

const displayCompanies = (companies) => {
    companies.forEach((company) => {
        let card = document.createElement('section');
        let logo = document.createElement('img');
        let name = document.createElement('h4');
        let address = document.createElement('p');
        let phone = document.createElement('p');
        let web = document.createElement('p'); 
        let membership = document.createElement('p');
        let industry = document.createElement('p');

        // Set content
        name.textContent = company.compname;
        address.textContent = `Address: ${company.address}`;
        phone.textContent = `Phone: ${company.phone}`;
        web.innerHTML = `Website: <a href="${company.web}" target="_blank">${company.web}</a>`;
        membership.textContent = `Membership: ${company.membership}`;
        industry.textContent = `Industry: ${company.industry}`;

        // Set logo attributes
        logo.setAttribute('src', company.imageurl);
        logo.setAttribute('alt', `logo of ${company.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '340');
        logo.setAttribute('height', '440');

        // Append children
        card.appendChild(logo);
        card.appendChild(name);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(web);
        card.appendChild(membership);
        card.appendChild(industry);

        cards.appendChild(card);
    });
}