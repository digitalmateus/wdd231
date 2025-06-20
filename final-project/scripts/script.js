document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('flightForm');
  const oneWayCheckbox = document.getElementById('oneWay');
  const returnDateInput = document.getElementById('returnDate');
  const resultsDiv = document.getElementById('results');

  const API_KEY = 'NSSQzwh8G7bArxHJeG2u2cDe0ubClARw';
  const API_SECRET = 'lVuC81GsNvsWSkL8';
  const BASE_URL = 'https://test.api.amadeus.com/v2';

  // Hide return date if "One-way" is checked
  oneWayCheckbox.addEventListener('change', () => {
    returnDateInput.parentElement.style.display = oneWayCheckbox.checked ? 'none' : 'block';
    returnDateInput.disabled = oneWayCheckbox.checked;
  });

  // Real time IATA suggestions
  const departureInput = document.getElementById('departure');
  const arrivalInput = document.getElementById('arrival');
  const departureSuggestions = document.getElementById('departureSuggestions');
  const arrivalSuggestions = document.getElementById('arrivalSuggestions');

  [departureInput, arrivalInput].forEach((input) => {
    input.addEventListener('input', async () => {
      const query = input.value.trim();
      if (query.length < 2) return;

      const list = input.id === 'departure' ? departureSuggestions : arrivalSuggestions;
      list.innerHTML = '';

      try {
        const tokenRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: API_KEY,
            client_secret: API_SECRET
          })
        });
        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access_token;

        const locationRes = await fetch(`https://test.api.amadeus.com/v1/reference-data/locations?keyword=${query}&subType=AIRPORT`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = await locationRes.json();

        if (data.data) {
          data.data.forEach((loc) => {
            const li = document.createElement('li');
            li.textContent = `${loc.address.cityName} (${loc.iataCode})`;
            li.addEventListener('click', () => {
              input.value = loc.iataCode;
              list.innerHTML = '';
            });
            list.appendChild(li);
          });
        }
      } catch (error) {
        console.error('IATA fetch error:', error);
      }
    });
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = '<p>Searching flights...</p>';

    const departure = document.getElementById('departure').value.trim().toUpperCase();
    const arrival = document.getElementById('arrival').value.trim().toUpperCase();
    const departureDate = document.getElementById('departureDate').value;
    const returnDate = document.getElementById('returnDate').value;
    const isOneWay = oneWayCheckbox.checked;

    try {
      // Step 1: Get access token
      const tokenRes = await fetch('https://test.api.amadeus.com/v1/security/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: API_KEY,
          client_secret: API_SECRET
        })
      });
      const tokenData = await tokenRes.json();
      const accessToken = tokenData.access_token;

      // Step 2: Build query
      const params = new URLSearchParams({
        originLocationCode: departure,
        destinationLocationCode: arrival,
        departureDate,
        adults: '1',
        currencyCode: 'USD',
        max: '6'
      });

      if (!isOneWay && returnDate) {
        params.append('returnDate', returnDate);
      }

      // Step 3: Search flights
      const flightRes = await fetch(`${BASE_URL}/shopping/flight-offers?${params}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      const flightData = await flightRes.json();
      displayResults(flightData);
    } catch (err) {
      console.error(err);
      resultsDiv.innerHTML = `<p style="color:red;">An error occurred. Try again later.</p>`;
    }
  });

  const airlineNames = {
    TP: "TAP Air Portugal",
    AA: "American Airlines",
    DL: "Delta Air Lines",
    UA: "United Airlines",
    LH: "Lufthansa",
    AF: "Air France",
    BA: "British Airways",
    AZ: "ITA Airways",
    EK: "Emirates",
    QR: "Qatar Airways",
    IB: "Iberia",
    G3: "Gol Linhas Aéreas",
    LA: "LATAM Airlines",
    IAD: "Washington",
    UX: "Air Europa",
    CDG: "Paris"
    // Add more as needed
  };

  function getAirlineName(code) {
    return airlineNames[code] || code;
  }

  function displayResults(data) {
    resultsDiv.innerHTML = '';

    if (!data.data || data.data.length === 0) {
      resultsDiv.innerHTML = '<p>No flights found.</p>';
      return;
    }

    data.data.forEach((offer, i) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];

      const departureCode = segment.departure.iataCode;
      const arrivalCode = segment.arrival.iataCode;
      const departureTime = segment.departure.at;
      const arrivalTime = segment.arrival.at;
      const airlineCode = segment.carrierCode;
      const airline = getAirlineName(airlineCode);
      const price = offer.price.total;

      const card = document.createElement('div');
      card.classList.add('flight-card');
      card.innerHTML = `
        <h4>Option ${i + 1}</h4>
        <p><strong>From:</strong> ${departureCode}</p>
        <p><strong>Departure:</strong> ${departureTime}</p>
        <p><strong>To:</strong> ${arrivalCode}</p>
        <p><strong>Arrival:</strong> ${arrivalTime}</p>
        <p><strong>Airline:</strong> ${airline} (${airlineCode})</p>
        <p><strong>Total Price:</strong> $${price}</p>
        <button class="whatsapp-button"> <i class="fab fa-whatsapp"></i> I want this</button>
      `;

      const button = card.querySelector('.whatsapp-button');
      button.addEventListener('click', () => {
        const dates = `${departureTime} - ${arrivalTime}`;
        sendWhatsAppMessage(departureCode, arrivalCode, dates, airline, `$${price}`);
      });

      resultsDiv.appendChild(card);
    });
  }

  function sendWhatsAppMessage(from, to, dates, airline, price) {
    const message = `Hello Maxima, I'm interested in this flight:\n\nFrom: ${from}\nTo: ${to}\nDates: ${dates}\nAirline: ${airline}\nPrice: ${price}`;
    const phoneNumber = '5515997041806';
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  }

  // Hamburger menu toggle
  const hamburgerElement = document.querySelector('#myButton');
  const navElement = document.querySelector('#animate-menu');

  hamburgerElement.addEventListener('click', () => {
    navElement.classList.toggle('open');
    hamburgerElement.classList.toggle('open');
  });
});
