const wurl = 'https://api.open-meteo.com/v1/forecast?latitude=23.4709&longitude=47.4851&current_weather=true&timezone=America%2FSao_Paulo';

async function getWeather() {
    try {
        const response = await fetch(wurl);
        if (!response.ok) throw new Error('No response from the network');
        const data = await response.json();
        console.log(data); // Para depurar
        displayWeather(data.current_weather);
    } catch (error) {
        console.error('weather fetch error: ', error);
    }   
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (weatherDiv && data) {
        const temp = document.createElement('p');
        const wind = document.createElement('p');
        const direction = document.createElement('p');
        const code = document.createElement('p');

        temp.textContent = `Temperature: ${data.temperature}°C`;
        wind.textContent = `Windspeed: ${data.windspeed} km/h`;
        direction.textContent = `Wind Direction: ${data.winddirection}°`;
        code.textContent = `Weather Code: ${data.weathercode}`;

        weatherDiv.appendChild(temp);
        weatherDiv.appendChild(wind);
        weatherDiv.appendChild(direction);
        weatherDiv.appendChild(code);
    }
}

getWeather();