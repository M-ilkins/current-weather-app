

function getLocationCoordinates() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((pos) => {
        let latitude = pos.coords.latitude;
        let longitude = pos.coords.longitude;
        getWeatherDataFromApi(latitude, longitude);
    });
  } else {
    document.body.innerHTML = "Geolocation is not supported by this browser.";
  }
};

function getWeatherDataFromApi(latitude, longitude){
    const apiKey = '';
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
    const apiUrlParams = `lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`;
    fetch(apiUrl+apiUrlParams).then((data) => {
        return data.json();
    }).then((jsonData) => {
        console.log(jsonData);
        const usefulWeatherData = {
            city: jsonData.name,
            country: jsonData.sys.country,
            description: jsonData.weather[0].description,
            high: jsonData.main.temp_max,
            low: jsonData.main.temp_min,
            current: jsonData.main.temp,
            icon: jsonData.weather[0].icon
        };
        displayWeatherInfo(usefulWeatherData);
    })
};


function displayWeatherInfo(weatherObject){
    document.querySelector('.loading-page').style.display = 'none';

    fetch(`http://openweathermap.org/img/wn/${weatherObject.icon}@2x.png`)
    .then((imgUrl) => {
        document.getElementById('icon-image').src = imgUrl.url;
    });
    
    document.getElementById('location').textContent =
     `${weatherObject.city}, ${weatherObject.country}`;

     document.getElementById('description').textContent = weatherObject.description; 
   
    document.getElementById('high').textContent =
    `High: ${weatherObject.high}°`;
   
     document.getElementById('low').textContent =
     `Low: ${weatherObject.low}°`;
    
     document.getElementById('current').textContent =
     `Current: ${weatherObject.current}°`;
};

getLocationCoordinates();
