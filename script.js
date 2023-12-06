// Function to convert temperature from Kelvin to Fahrenheit.
function kelvinToFahrenheit(kelvin) {
    return (kelvin - 273.15) * 9/5 + 32;
}

// Function to fetch and display the weather data.
function fetchWeatherData(cityName) {
    const apiKey = '8cbc36a25efeb4b9e5921e0a757cfbf9';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            // Updates the forecast section with the retrieved data.
            updateForecast(data);
            document.getElementById('cityForecastHeading').textContent = `5-Day Forecast for ${cityName}`;
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            // Catch error will display a message if true.
        });
}

// Function to update the forecast section.
function updateForecast(data) {
    const forecastElement = document.getElementById('forecastBoxes');

    // Clears previous forecast data.
    forecastElement.innerHTML = '';

    // Loop through the 5-day forecast.
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000); 
        const iconCode = forecastItem.weather[0].icon;
 // Convert temperature from Kelvin to Fahrenheit.
        const temperatureFahrenheit = kelvinToFahrenheit(forecastItem.main.temp)

        // Put the image source under the date so that icons could display along with the display boxes.
        const forecastHtml = `
        <div class="forecast-item">
        <p>Date: ${date.toDateString()}</p>
        <img src="https://openweathermap.org/img/wn/${iconCode}@2x.png" alt="Weather Icon">
        <p>Temperature: ${temperatureFahrenheit.toFixed(2)} °F</p>
        <p>Wind Speed: ${forecastItem.wind.speed} m/s</p>
        <p>Humidity: ${forecastItem.main.humidity}%</p> 
 </div>
`; 
// No other elements needed for weather display in DIVs above.
        forecastElement.innerHTML += forecastHtml;
    }
}

// This function generates city buttons for populated states, along with a const to grab cityButtons element in HTML so it is appended.
function generateCityButtons () {
    const usCities = [
        'New york', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', "San Antonio", 'San Diego'
    ];
    const cityButtonsElement = document.getElementById('cityButtons');
// Loop through each city in the list. Also added buttons and a click event listener to fetch the weather data. 
    usCities.forEach(city => {
        const button = document.createElement('button');
        button.classList.add('city-button');
        button.textContent = city;
        button.addEventListener('click', function() {
            console.log(`Button clicked for city: ${city}`);
            fetchWeatherData(city);
    });
    cityButtonsElement.appendChild(button);
});
console.log('City buttons generated.');
}

generateCityButtons();

document.getElementById('cityForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cityName = document.getElementById('cityInput').value;

    console.log(`Form submitted with city name: ${cityName}`);
    
    fetchWeatherData(cityName);
});
