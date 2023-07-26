
// Function to update the DOM with weather information

function updateDOM(data) {
    // Extract weather data
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const windDirection = data.wind.deg;
    const pressure = data.main.pressure;
    const visibility = data.visibility;
    const cityName = data.name;
    const timeStamp = data.dt;
    const weatherDescription = data.weather[0].description;

  
    // Format day and date
    const fetchDate = new Date(timeStamp * 1000);
    const fetchDay = fetchDate.toLocaleDateString('en-US', { weekday: 'long' });
    const fullDate = fetchDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const hours = fetchDate.getHours();
  
    // Log weather data
    console.log("Temperature:", temperature, "°C");
    console.log("Humidity:", humidity, "%");
    console.log("Wind Speed:", windSpeed, "km/h");
    console.log("Pressure:", pressure);
    console.log("Visibility:", visibility / 1000, "km");
    console.log("Wind Direction:", windDirection);
  
    // DOM manipulation
  
    // Update temperature
    const newTemperature = document.getElementById('temp');
    newTemperature.innerHTML = `${temperature}<span>&#176;</span>`;
  
    // Update city name
    const newCity = document.getElementById('city');
    newCity.innerHTML = cityName;

    // Update cloud type
    const newCloudType = document.getElementById('cloud-type')
    newCloudType.innerHTML = weatherDescription;
  
    // Update day and date
    const newDay = document.getElementById("day");
    newDay.innerHTML = fetchDay;
  
    const newDate = document.getElementById("date");
    newDate.innerHTML = fullDate;
  
    // Update humidity
    const newHumidity = document.getElementById("humidity");
    newHumidity.innerHTML = `${humidity}%`;
  
    // Update wind speed
    const newWindSpeed = document.getElementById("wind-speed");
    newWindSpeed.innerHTML = `${(windSpeed*3.6).toFixed(2)} km/h`;
  
    // Update wind direction
    const newWindDirection = document.getElementById("wind-direction");
    newWindDirection.innerHTML = `${windDirection}`;
  
    // Update visibility
    const newVisibility = document.getElementById("visibility");
    newVisibility.innerHTML = `${visibility / 1000} km`;
  
    // Update pressure
    const newPressure = document.getElementById("pressure");
    newPressure.innerHTML = `${(pressure*0.0009869233).toFixed(2)}   atm`;
  
    // Call the function to change the background image based on the time
    function changeStyle() {
      const bgImage = document.getElementById('main');
  
      if (hours <= 16) {
        bgImage.style.backgroundImage = 'url(./Day_image.png)';
      } else if (hours <= 19 && hours > 16) {
        bgImage.style.backgroundImage = 'url(./Evening_image.png)';
      } else if (hours > 19) {
        bgImage.style.backgroundImage = 'url(./Night_image.png)';
      }
    }
    changeStyle();
  }
  
  // Function to make the API call and get weather data
  function getWeatherData(latitude, longitude) {
    const apiKey = '290bf4450ea9050b0db7e08d612ab465';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
    const body = document.querySelector('body')
    body.style.overflow = 'hidden';
    body.style.filter = 'blur(5px)';


    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        console.log(data);
  
        // Call the function to update the DOM with weather information
        updateDOM(data);
        body.style.overflow = 'auto';
        body.style.filter = 'none';
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }
  
  // Function to get the user's geolocation
  function getLocation() {
    if (navigator.geolocation) {
      // Check for user acceptance
      navigator.geolocation.getCurrentPosition(showPosition,handleGeolocationError);
    } else {
      console.log("Geolocation is not supported in this browser.");
    }
  }
  
  // Callback function to handle the geolocation position
  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
  
    // Call getWeatherData and pass the latitude and longitude
    getWeatherData(latitude, longitude);
  }
  
  // Call the getLocation function to start the process
  getLocation();

  function handleGeolocationError(error) {
    if (error.PERMISSION_DENIED) {
        alert("Give acces to your location")
    }
  }  