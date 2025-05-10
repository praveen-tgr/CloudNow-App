const apiKey = '9505fd1df737e20152fbd78cdb289b6a';
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const city = document.getElementById('city');
const temp = document.getElementById('temp');
const weatherIcon = document.getElementById('weatherIcon');
const condition = document.getElementById('condition');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
const date = document.getElementById('date');

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

function updateDate() {
    const today = new Date();
    const day = days[today.getDay()];
    const month = months[today.getMonth()];
    const date_num = today.getDate();
    date.textContent = `${day}, ${date_num} ${month}`;
}

async function getWeather(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) throw new Error('City not found');

        const data = await response.json();
        updateWeather(data);
    } catch (error) {
        alert('Please enter a valid city name');
    }
}

function updateWeather(data) {
    city.textContent = `${data.name}, ${data.sys.country}`;
    temp.textContent = `${Math.round(data.main.temp)}°C`;
    condition.textContent = data.weather[0].description.charAt(0).toUpperCase() + 
                          data.weather[0].description.slice(1);
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    humidity.textContent = data.main.humidity;
    wind.textContent = data.wind.speed;
    pressure.textContent = data.main.pressure;
}

searchButton.addEventListener('click', () => {
    const cityName = cityInput.value.trim();
    if (cityName) getWeather(cityName);
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const cityName = cityInput.value.trim();
        if (cityName) getWeather(cityName);
    }
});

// Initialize
updateDate();
getWeather('New York');
