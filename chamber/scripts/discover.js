import { places } from '../data/places.mjs';

document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('#places');

    if (!container) {
        console.error('Error: Element with id="places" not found.');
        return;
    }

    places.forEach(place => {
        const card = document.createElement('section');

        const photo = document.createElement('img');
        photo.setAttribute('src', `images/${place.photo_url}`);
        photo.setAttribute('alt', `Photo of ${place.title}`);
        // photo.setAttribute('loading', 'lazy');
        photo.setAttribute('width', '300');
        photo.setAttribute('height', '150');

        const title = document.createElement('h2');
        title.textContent = place.title;

        const address = document.createElement('p');
        address.textContent = place.address;
        address.classList.add('address');

        const description = document.createElement('p');
        description.textContent = place.description;
        description.classList.add('desc');

        // const cost = document.createElement('p');
        // cost.textContent = place.cost;

        // Layout: Photo → Title → Address → Cost
        card.appendChild(photo);
        card.appendChild(title);
        card.appendChild(address);
        card.appendChild(description);
        // card.appendChild(cost);

        container.appendChild(card);
    });
});
