const apiKey = '66e7b1c7d5daa8985113241bc8ee36c2'; // Replace with your actual OpenWeatherMap API key

async function getWeather() {
    const input = document.getElementById('city').value;
    if (!input) {
        alert('Please enter a city or pin code');
        return;
    }

    // Determine if input is a pin code (numeric) or city name
    const isPinCode = /^\d+$/.test(input);
    let url = '';

    if (isPinCode) {
        // If input is a pin code, use the pin code endpoint
        url = `https://api.openweathermap.org/data/2.5/weather?zip=${input}&appid=${apiKey}&units=metric`;
    } else {
        // Otherwise, treat input as a city name
        url = `https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${apiKey}&units=metric`;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === '404') {
            alert('Location not found');
            return;
        }

        document.getElementById('city-name').innerText = `Weather in ${data.name}`;
        document.getElementById('temperature').innerText = `Temperature: ${data.main.temp}°C`;
        document.getElementById('description').innerText = `Description: ${data.weather[0].description}`;
        document.getElementById('humidity').innerText = `Humidity: ${data.main.humidity}%`;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data');
    }
}
