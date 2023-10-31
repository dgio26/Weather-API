const apiKey = "ade7f335ba3cb439acee45ebbf7552c9";

const cityForm = document.getElementById("cityForm");
const cityInput = document.getElementById("cityInput");

const cityNameElement = document.getElementById("cityName");
const temperatureElement = document.getElementById("temperature");
const feelsLikeElement = document.getElementById("feelsLike");
const categoryElement = document.getElementById("category");
const humidityElement = document.getElementById("humidity");
const windElement = document.getElementById("wind");

cityForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    }
});

function fetchWeatherData(city) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
            const cityName = data.name;
            const temperatureCelsius = data.main.temp - 273.15; // Temperature is in Kelvin
            const feelsLikeCelsius = data.main.feels_like - 273.15;
            const weatherCategory = data.weather[0].description;
            const humidity = data.main.humidity;
            const windSpeed = data.wind.speed;

            cityNameElement.textContent = `${cityName}`;
            temperatureElement.textContent = `${temperatureCelsius.toFixed(2)}°C`;
            feelsLikeElement.textContent = `${feelsLikeCelsius.toFixed(2)}°C`;
            categoryElement.textContent = `${weatherCategory}`;
            humidityElement.textContent = `${humidity}%`;
            windElement.textContent = `${windSpeed} m/s`;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
}
