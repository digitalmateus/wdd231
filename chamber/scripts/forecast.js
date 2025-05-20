const forecastUrl = 'https://api.open-meteo.com/v1/forecast?latitude=23.4709&longitude=47.4851&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=America%2FSao_Paulo';

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
        const labels = ['Today', 'Tomorrow', 'After Tomorrow'];

        for (let i = 0; i < 3; i++) {
            const day = document.createElement('div');
            day.style.marginBottom = '10px';

            const label = document.createElement('h4');
            const temp = document.createElement('p');
            const code = document.createElement('p');

            label.textContent = labels[i];
            temp.textContent = `Min: ${dailyData.temperature_2m_min[i]}°C | Max: ${dailyData.temperature_2m_max[i]}°C`;
            code.textContent = `Weather Code: ${dailyData.weathercode[i]}`;

            day.appendChild(label);
            day.appendChild(temp);
            day.appendChild(code);

            forecastDiv.appendChild(day);
        }
    }
}

getForecast();