function showCurrentDate(latestDate) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let day = days[latestDate.getDay()];
  let month = months[latestDate.getMonth()];
  let date = latestDate.getDate();
  let year = latestDate.getFullYear();
  let hours = latestDate.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = latestDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dateToday = document.querySelector("#current-date-time");
  dateToday.innerHTML = `${day}, ${date} ${month} ${year}<br />${hours}:${minutes}`;
  return dateToday;
}

function showWeather(response) {
//Refactored code:
document.querySelector("h2").innerHTML = response.data.name;
document.querySelector("#temperature").innerHTML = `${Math.round(response.data.main.temp)}°`;
document.querySelector("#perception").innerHTML = `Feels like ${Math.round(response.data.main.feels_like)}°`;
document.querySelector("#max-temp").innerHTML = `${Math.round(response.data.main.temp_max)}°`;
document.querySelector("#min-temp").innerHTML = `${Math.round(response.data.main.temp_min)}°`;
document.querySelector("#humidity-value").innerHTML = response.data.main.humidity;
document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
document.querySelector("#weather-description").innerHTML = response.data.weather[0].description;
//Detailed code:
//let city = response.data.name;
//let temperature = Math.round(response.data.main.temp);
//let temperatureFeelsLike = Math.round(response.data.main.feels_like);
//let temperatureMax = Math.round(response.data.main.temp_max);
//let temperatureMin = Math.round(response.data.main.temp_min);
//let humidityElement = Math.round(response.data.main.humidity);
//let windElement = Math.round(response.data.wind.speed);
//let weatherSentence = response.data.weather[0].description;
//let cityName = document.querySelector("h2");
//let temperatureCity = document.querySelector("#temperature");
//let temperaturePerception = document.querySelector("#perception");
//let maximumTemp = document.querySelector("#max-temp");
//let minimumTemp = document.querySelector("#min-temp");
//let humidity = document.querySelector("#humidity-value");
//let windSpeed = document.querySelector("#wind-speed");
//let weatherDescription = document.querySelector("#weather-description");
//cityName.innerHTML = city;
//temperatureCity.innerHTML = `${temperature}°`;
//temperaturePerception.innerHTML = `Feels like ${temperatureFeelsLike}°`;
//maximumTemp.innerHTML = `${temperatureMax}°`;
//minimumTemp.innerHTML = `${temperatureMin}°`;
//humidity.innerHTML = `${humidityElement}%`;
//windSpeed.innerHTML = `${windElement} km/h`;
//weatherDescription.innerHTML = weatherSentence;
}
function searchCity(city) {
  let units = "metric";
  let apiKey = "82a7c76c4a898d9f4cee978bafdd1b60";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeather);
}

function showCity(event) {
  event.preventDefault();
  //let cityName = document.querySelector("#city-input");
  //let city = `${cityName.value}`;
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "82a7c76c4a898d9f4cee978bafdd1b60";
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}`;
  let apiUrl = `${apiEndpoint}&appid=${apiKey}&units=${units}`;
   axios.get(apiUrl).then(showWeather);
}

function getGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentDate = new Date();
showCurrentDate(currentDate);

let enterCityForm = document.querySelector("#search-city");
enterCityForm.addEventListener("submit", showCity);

let currentLocationButton = document.querySelector("#location-icon");
currentLocationButton.addEventListener("click", getGeoLocation);

searchCity("Munich");