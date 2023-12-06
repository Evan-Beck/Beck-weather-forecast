// Function to fetch and display the weather data.
function fetchWeatherData(cityName) {
    const apiKey = '8cbc36a25efeb4b9e5921e0a757cfbf9';
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            // Updates the forecast section with the retrieved data.
            updateForecast(data);
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            // Catch error will display a message if true.
        });
}

// Function to update the forecast section.
function updateForecast(data) {
    const forecastElement = document.getElementById('forecast');

    // Clears previous forecast data.
    forecastElement.innerHTML = '';

    // Loop through the 5-day forecast.
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = data.list[i];
        const date = new Date(forecastItem.dt * 1000); 

        const forecastHtml = `
        <div class="forecast-item">
        <p>Date: ${date.toDateString()}</p>
        <p>Temperature: ${forecastItem.main.temp} K</p>
        <!-- Add other forecast information as needed -->
 </div>
`;
        forecastElement.innerHTML += forecastHtml;
    }
}


document.getElementById('cityForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cityName = document.getElementById('cityInput').value;
    
    fetchWeatherData(cityName);
});
