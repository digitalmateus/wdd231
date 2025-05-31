document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('flightForm');
  const oneWayCheckbox = document.getElementById('oneWay');
  const returnDateInput = document.getElementById('returnDate');
  const resultsDiv = document.getElementById('results');

  const API_KEY = 'GvMPfXWPzDwwxwJ1UX65pCHucO6zreGF';
  const API_SECRET = '3UrF5u8CeAvxlunz';
  const BASE_URL = 'https://test.api.amadeus.com/v2';

  // Hide return date if "One-way" is checked
  oneWayCheckbox.addEventListener('change', () => {
    returnDateInput.parentElement.style.display = oneWayCheckbox.checked ? 'none' : 'block';
    returnDateInput.disabled = oneWayCheckbox.checked;
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
        max: '5'
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

  function displayResults(data) {
    resultsDiv.innerHTML = ''; // Clear previous

    if (!data.data || data.data.length === 0) {
      resultsDiv.innerHTML = '<p>No flights found.</p>';
      return;
    }

    data.data.forEach((offer, i) => {
      const itinerary = offer.itineraries[0];
      const segment = itinerary.segments[0];

      const card = document.createElement('div');
      card.classList.add('flight-card');
      card.innerHTML = `
        <h4>Option ${i + 1}</h4>
        <p><strong>From:</strong> ${segment.departure.iataCode} (${segment.departure.at})</p>
        <p><strong>To:</strong> ${segment.arrival.iataCode} (${segment.arrival.at})</p>
        <p><strong>Airline:</strong> ${segment.carrierCode}</p>
        <p><strong>Total Price:</strong> $${offer.price.total}</p>
      `;
      resultsDiv.appendChild(card);
    });
  }
});
