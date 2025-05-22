document.addEventListener('DOMContentLoaded', () => {
    const url = 'data/members.json';
    const cards = document.querySelector('#cards');

    if (!cards) {
        alert('Error: Element with id="cards" not found. Make sure you are on the correct page and the element exists in your HTML.');
        console.error('Element with id="cards" not found.');
        return;
    }

    async function getCompanyInfo() {
        const response = await fetch(url);
        const data = await response.json();
        displayCompanies(data.companies);
    }

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

            name.textContent = company.compname;
            address.textContent = `Address: ${company.address}`;
            phone.textContent = `Phone: ${company.phone}`;
            web.innerHTML = `Website: <a href="${company.web}" target="_blank">${company.web}</a>`;
            membership.textContent = `Membership: ${company.membership}`;
            industry.textContent = `Industry: ${company.industry}`;

            logo.setAttribute('src', company.imageurl);
            logo.setAttribute('alt', `logo of ${company.compname}`);
            logo.setAttribute('loading', 'lazy');
            logo.setAttribute('width', '350');
            logo.setAttribute('height', '350');

            card.appendChild(logo);
            card.appendChild(name);
            card.appendChild(address);
            card.appendChild(phone);
            card.appendChild(web);
            card.appendChild(membership);
            card.appendChild(industry);

            cards.appendChild(card);
        });
    };

    getCompanyInfo();

    // Grid/List toggle logic
    const gridBtn = document.getElementById('gridBtn');
    const listBtn = document.getElementById('listBtn');

    if (gridBtn && listBtn) {
        gridBtn.addEventListener('click', () => {
            cards.classList.remove('list-view');
            // Show all logos
            document.querySelectorAll('#cards img').forEach(img => {
                img.style.display = '';
            });
        });

        listBtn.addEventListener('click', () => {
            cards.classList.add('list-view');
            // Hide all logos
            document.querySelectorAll('#cards img').forEach(img => {
                img.style.display = 'none';
            });
        });
    } else {
        console.warn('Grid/List toggle buttons not found.');
    }
});
