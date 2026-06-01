const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const searchInput = document.querySelector('.search-box input');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const statusMessage = document.querySelector('.status-message');

const image = document.querySelector('.weather-box img');
const locationLabel = document.querySelector('.weather-box .location');
const temperature = document.querySelector('.weather-box .temperature');
const description = document.querySelector('.weather-box .description');
const humidity = document.querySelector('.weather-details .humidity span');
const wind = document.querySelector('.weather-details .wind span');

const weatherCodeMap = {
    0: { description: 'Clear sky', image: 'images/clear.png' },
    1: { description: 'Mainly clear', image: 'images/clear.png' },
    2: { description: 'Partly cloudy', image: 'images/cloud.png' },
    3: { description: 'Overcast', image: 'images/cloud.png' },
    45: { description: 'Fog', image: 'images/mist.png' },
    48: { description: 'Depositing rime fog', image: 'images/mist.png' },
    51: { description: 'Light drizzle', image: 'images/rain.png' },
    53: { description: 'Moderate drizzle', image: 'images/rain.png' },
    55: { description: 'Dense drizzle', image: 'images/rain.png' },
    56: { description: 'Light freezing drizzle', image: 'images/snow.png' },
    57: { description: 'Dense freezing drizzle', image: 'images/snow.png' },
    61: { description: 'Slight rain', image: 'images/rain.png' },
    63: { description: 'Moderate rain', image: 'images/rain.png' },
    65: { description: 'Heavy rain', image: 'images/rain.png' },
    66: { description: 'Light freezing rain', image: 'images/snow.png' },
    67: { description: 'Heavy freezing rain', image: 'images/snow.png' },
    71: { description: 'Slight snow fall', image: 'images/snow.png' },
    73: { description: 'Moderate snow fall', image: 'images/snow.png' },
    75: { description: 'Heavy snow fall', image: 'images/snow.png' },
    77: { description: 'Snow grains', image: 'images/snow.png' },
    80: { description: 'Slight rain showers', image: 'images/rain.png' },
    81: { description: 'Moderate rain showers', image: 'images/rain.png' },
    82: { description: 'Violent rain showers', image: 'images/rain.png' },
    85: { description: 'Slight snow showers', image: 'images/snow.png' },
    86: { description: 'Heavy snow showers', image: 'images/snow.png' },
    95: { description: 'Thunderstorm', image: 'images/rain.png' },
    96: { description: 'Thunderstorm with hail', image: 'images/rain.png' },
    99: { description: 'Severe thunderstorm with hail', image: 'images/rain.png' }
};

const toggleWeather = (isVisible) => {
    weatherBox.style.display = isVisible ? '' : 'none';
    weatherDetails.style.display = isVisible ? '' : 'none';
};

const showStatus = (message) => {
    statusMessage.textContent = message;
    statusMessage.style.display = 'block';
};

const showError = (message) => {
    container.style.height = '440px';
    toggleWeather(false);
    showStatus(message);
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
};

const resetErrorState = () => {
    error404.style.display = 'none';
    error404.classList.remove('fadeIn');
};

const renderWeather = (placeName, currentWeather, relativeHumidity) => {
    const weatherData = weatherCodeMap[currentWeather.weathercode] || {
        description: 'Weather unavailable',
        image: 'images/cloud.png'
    };

    image.src = weatherData.image;
    locationLabel.textContent = placeName;
    temperature.innerHTML = `${Math.round(currentWeather.temperature)}<span>&deg;C</span>`;
    description.textContent = weatherData.description;
    humidity.textContent = `${relativeHumidity}%`;
    wind.textContent = `${Math.round(currentWeather.windspeed)} km/h`;

    toggleWeather(true);
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '620px';
};

const getCurrentHumidity = (hourlyData, currentTime) => {
    const currentIndex = hourlyData.time.indexOf(currentTime);
    if (currentIndex === -1) {
        return '--';
    }

    return Math.round(hourlyData.relativehumidity_2m[currentIndex]);
};

const searchWeather = async () => {
    const city = searchInput.value.trim();

    if (!city) {
        showStatus('Enter a city name to search for weather details.');
        searchInput.focus();
        return;
    }

    search.disabled = true;
    resetErrorState();
    toggleWeather(false);
    showStatus('Loading current weather...');
    container.style.height = '160px';

    try {
        const geoResponse = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`);
        const geoJson = await geoResponse.json();

        if (!geoResponse.ok || !geoJson.results || geoJson.results.length === 0) {
            showError('No matching location was found.');
            return;
        }

        const match = geoJson.results[0];
        const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${match.latitude}&longitude=${match.longitude}&current_weather=true&hourly=relativehumidity_2m&timezone=auto`);
        const weatherJson = await weatherResponse.json();

        if (!weatherResponse.ok || !weatherJson.current_weather || !weatherJson.hourly) {
            showError('Weather data is unavailable right now. Please try again.');
            return;
        }

        const relativeHumidity = getCurrentHumidity(weatherJson.hourly, weatherJson.current_weather.time);
        const region = match.admin1 ? `, ${match.admin1}` : '';
        const country = match.country ? `, ${match.country}` : '';

        resetErrorState();
        statusMessage.style.display = 'none';
        renderWeather(`${match.name}${region}${country}`, weatherJson.current_weather, relativeHumidity);
    } catch (error) {
        showError('Network error. Check your internet connection and try again.');
    } finally {
        search.disabled = false;
    }
};

search.addEventListener('click', searchWeather);
searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        searchWeather();
    }
});
