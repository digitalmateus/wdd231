const forecastUrl = 'https://api.open-meteo.com/v1/forecast?latitude=23.4709&longitude=47.4851&daily=temperature_2m_min,temperature_2m_max,weathercode&forecast_days=3&timezone=America%2FSao_Paulo';

const weatherCodeDescriptions = {
  0: "Clear sky",
  1: "Mainly clear",
  2: "Partly cloudy",
  3: "Overcast",
  45: "Fog",
  48: "Depositing rime fog",
  51: "Light drizzle",
  53: "Moderate drizzle",
  55: "Dense drizzle",
  56: "Light freezing drizzle",
  57: "Dense freezing drizzle",
  61: "Slight rain",
  63: "Moderate rain",
  65: "Heavy rain",
  66: "Light freezing rain",
  67: "Heavy freezing rain",
  71: "Slight snow fall",
  73: "Moderate snow fall",
  75: "Heavy snow fall",
  77: "Snow grains",
  80: "Slight rain showers",
  81: "Moderate rain showers",
  82: "Violent rain showers",
  85: "Slight snow showers",
  86: "Heavy snow showers",
  95: "Thunderstorm",
  96: "Thunderstorm with slight hail",
  99: "Thunderstorm with heavy hail"
};

async function getForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error('No response from the network');
        const data = await response.json();
        console.log(data);
        displayForecast(data.daily);
    } catch (error) {
        console.error('forecast fetch error:', error);
    }
}

function displayForecast(dailyData) {
    const forecastDiv = document.getElementById('wforecast');
    if (forecastDiv && dailyData) {
        forecastDiv.innerHTML = '';
        const labels = ['Today', 'Tomorrow', 'After Tomorrow'];
        for (let i = 0; i < 3; i++) {
            const day = document.createElement('div');
            day.style.marginBottom = '10px';
            const label = document.createElement('h4');
            const temp = document.createElement('p');
            const code = document.createElement('p');
            label.textContent = labels[i];
            temp.textContent = `Min: ${dailyData.temperature_2m_min[i]}°C | Max: ${dailyData.temperature_2m_max[i]}°C`;
            const codeNum = dailyData.weathercode[i];
            code.textContent = `Weather: ${weatherCodeDescriptions[codeNum] || 'Unknown'}`;
            day.appendChild(label);
            day.appendChild(temp);
            day.appendChild(code);
            forecastDiv.appendChild(day);
        }
    }
}

getForecast();