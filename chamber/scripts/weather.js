const wurl = 'https://api.openweathermap.org/data/2.5/weather?lat=23.4709&lon=47.4851&appid=aed622ddfc27cdae97a70191d9919090&units=metric';


async function getWeather() {
    try {
        const response = await fetch(wurl);
        if (!response.ok) throw new Error('No response from the network');
        const data = await response.json();
        console.log(data); 
        displayWeather(data);
    } catch (error) {
        console.error('weather fetch error: ', error);
    }   
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (weatherDiv && data) {
        // Clear previous content
        weatherDiv.innerHTML = '';
        // Temperature
        if (data.main && typeof data.main.temp !== 'undefined') {
            const temp = document.createElement('p');
            temp.textContent = `Temperature: ${data.main.temp}°C`;
            weatherDiv.appendChild(temp);
        }
        // Wind speed
        if (data.wind && typeof data.wind.speed !== 'undefined') {
            const wind = document.createElement('p');
            wind.textContent = `Windspeed: ${data.wind.speed} m/s`;
            weatherDiv.appendChild(wind);
        }
        // Wind direction
        if (data.wind && typeof data.wind.deg !== 'undefined') {
            const direction = document.createElement('p');
            direction.textContent = `Wind Direction: ${data.wind.deg}°`;
            weatherDiv.appendChild(direction);
        }
        // Weather description
        if (data.weather && data.weather[0]) {
            const desc = document.createElement('p');
            desc.textContent = `Description: ${data.weather[0].description}`;
            weatherDiv.appendChild(desc);
            // Optional: Weather icon
            if (data.weather[0].icon) {
                const icon = document.createElement('img');
                icon.setAttribute('src', `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
                icon.setAttribute('alt', data.weather[0].description);
                weatherDiv.appendChild(icon);
            }
        }
    }
}

getWeather();