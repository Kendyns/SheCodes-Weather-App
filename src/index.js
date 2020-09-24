// Change Time
function correctMinutes(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
//Change Active Button Colours
function CelActiveButton() {
  document.getElementById("cel").style.backgroundColor = "#3b6978";
  document.getElementById("far").style.backgroundColor = "#204051";
}
function FarActiveButton() {
  document.getElementById("cel").style.backgroundColor = "#204051";
  document.getElementById("far").style.backgroundColor = "#3b6978";
}
// Change to Fahrenheit
function toFar() {
  for (let i = 0; i < 6; i++) {
    let tempNumber = ".temp" + String(i);
    let convertF = temperatures[i] * 1.8 + 32;
    let temper = document.querySelector(tempNumber);
    temper.innerHTML = Math.round(convertF) + "°F";
  }
  let windUnits = document.querySelector(".units");
  let milesPH = windSpeed / 1.609;
  windUnits.innerHTML = Math.round(milesPH) + " mph";
  FarActiveButton();
}
// Change to Celcius
function toCel() {
  for (let i = 0; i < 6; i++) {
    let tempNumber = ".temp" + String(i);
    let convertC = temperatures[i];
    let temper = document.querySelector(tempNumber);
    temper.innerHTML = Math.round(convertC) + "°C";
  }
  let windUnits = document.querySelector(".units");
  windUnits.innerHTML = Math.round(windSpeed) + " km/hr";
  CelActiveButton();
}
// Change City
function findCity(event) {
  event.preventDefault();
  let input = document.querySelector("#location-input");
  let newPlace = document.querySelector(".city");
  let citySearch = input.value;
  newPlace.innerHTML = citySearch;
  input.value = "";
  document.getElementById("search-button").style.backgroundColor = "#3b6978";
  weatherLookup(citySearch);
}
let apiKey = "2101a412798b548bf7cc6d35c64d3994";
let locationPlace = document.querySelector("#location-search");
//Change Weather
function changeWeather(name, temp, humid, conditions, windS) {
  temp = Math.round(temp);
  windS = Math.round(windS);
  let place = document.querySelector(".city");
  place.innerHTML = name;
  let todayTemp = document.querySelector(".curr0");
  todayTemp.innerHTML = temp;
  let currentHum = document.querySelector(".humidity");
  currentHum.innerHTML = humid;
  let outside = document.querySelector(".condition");
  outside.innerHTML = conditions;
  let currentWind = document.querySelector(".wind");
  currentWind.innerHTML = windS;
}
function cityTime(time) {
  console.log(time);
  let cityTime = new Date(time * 1000);

  // Day of Week
  let daily = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let newToday = daily[cityTime.getDay()];
  // Change Days
  let today = document.querySelector(".today");
  today.innerHTML = newToday;
  //next 5 Days
  for (let i = 1; i < 6; i++) {
    let dayOfW = cityTime.getDay() + i;
    let dayNumber = ".day" + String(i);
    let currentDay = document.querySelector(dayNumber);
    if (dayOfW > 6) {
      dayOfW = dayOfW - 7;
    }
    currentDay.innerHTML = daily[dayOfW];
  }
  let hour = document.querySelector(".hour");
  let minute = document.querySelector(".minutes");
  let pm = document.querySelector(".afternoon");
  let largeTime = cityTime.getHours();
  let afternoon = "am";
  if (largeTime > 11) {
    afternoon = "pm";
  }
  if (largeTime > 12) {
    largeTime = largeTime - 12;
  }
  hour.innerHTML = largeTime;
  let minutes = cityTime.getMinutes();
  minute.innerHTML = correctMinutes(minutes);
  pm.innerHTML = afternoon;
}
function currentWeather(response) {
  let cityName = response.data.name;
  temperatures[0] = response.data.main.temp;
  let humid = response.data.main.humidity;
  let outsideView = response.data.weather[0].description;
  windSpeed = response.data.wind.speed;
  timestamp = response.data.dt;
  changeWeather(cityName, temperatures[0], humid, outsideView, windSpeed);
  cityTime(timestamp);
}

function weatherLookup(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  let urldays = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(currentWeather);
}
function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  let urldays = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric'`;
  axios.get(url).then(currentWeather);
}
function yourCity() {
  document.getElementById("your-city").style.backgroundColor = "#3b6978";
  navigator.geolocation.getCurrentPosition(showPosition);
}
// Current Date
let timestamp = null;

//null temp values
let temperatures = [null, 11, 15, 18, 19, 32];
let windSpeed = null;

let changeToF = document.querySelector(".far");
changeToF.addEventListener("click", toFar);
let changetoC = document.querySelector(".cel");
changetoC.addEventListener("click", toCel);

let yourCurrentCity = document.querySelector("#your-city");
yourCurrentCity.addEventListener("click", yourCity);

navigator.geolocation.getCurrentPosition(showPosition);
weatherLookup("Toronto");
locationPlace.addEventListener("submit", findCity);
let placeLocation = document.querySelector("#location-input");
placeLocation.addEventListener("keypress", function (e) {
  if (e.keyCode === 13) {
    findCity(event);
  }
});

// Things to do

// Update Date/Time for city Time zone
// multiday forecasting
//main icon change
// forecasting icon cahnge
// Javascript for weather saying
// descritpion - make left justified
