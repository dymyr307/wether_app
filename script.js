const param = {
   url: 'https://api.openweathermap.org/data/2.5/',
   appid: '57c9ce855a68bb50459b4c221bf46102',
};

const cities = {
   703448: 'Kyiv',
   2643741: 'London',
   5128581: 'New York',
};

let select = document.createElement('select');
document.body.append(select);

// select.setAttribute('class', 'city');

function addSelect() {
   let fragment = new DocumentFragment();
   for (let key in cities) {
      let option = document.createElement('option');
      option.append(cities[key]);
      fragment.append(option);
      option.setAttribute('value', key);
   }
   return fragment;
}

select.append(addSelect());
document.querySelector('.package').prepend(select);

function getWeather() {
   fetch(
      `${param.url}weather?id=${select.value}&units=metric&APPID=${param.appid}`
   )
      .then((weather) => {
         return weather.json();
      })
      .then(showWeather);
}

function showWeather(weather) {
   document.querySelector('.package-name').textContent = weather.name;

   document.querySelector('.price').innerHTML =
      Math.round(weather.main.temp) + '&deg;';
   document.querySelector('.celsius').addEventListener('click', function () {
      document.querySelector('.price').innerHTML =
         Math.round(weather.main.temp) + '&deg;';
   });

   document.querySelector('.fahrenheit').addEventListener('click', function () {
      document.querySelector('.price').innerHTML =
         Math.round(weather.main.temp * 1.8 + 32) + '&#8457;';
   });
   //!
   const timezoneOffset = weather.timezone;
   //? console.log(`timezoneOffset`, timezoneOffset);
   const localTime = new Date(Date.now() + timezoneOffset * 1000 - 2 * 3600000);
   //? console.log(`localTime`, localTime);
   const formattedTime = localTime.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
   });
   /*
   function convertTime(unixTime, timeZone) {
  let timezoneOffset = new Date().getTimezoneOffset() * 60;
  let date = new Date((unixTime + timezoneOffset + timeZone) * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let time = hours + ":" + minutes.slice(-2);
  return time;
}
   */
   //? console.log(`formattedTime`, formattedTime);

   document.querySelector('.time').innerText = formattedTime;

   document.querySelector('.disclaimer').textContent =
      weather.weather[0]['description'];

   document.querySelector(
      '.features li'
   ).innerHTML = `<img src="https://openweathermap.org/img/wn/${weather.weather[0]['icon']}@2x.png">`;

   document.querySelector('.wind').innerHTML =
      'wind speed: ' + weather.wind.speed;
   document.querySelector(
      '.deg'
   ).innerText = `wind direction: ${weather.wind.deg}`;

   document.querySelector(
      '.arrow'
   ).style.transform = `rotate(${weather.wind.deg}deg)`;

   document.querySelector(
      '.pressure'
   ).innerHTML = `pressure: ${weather.main.pressure}`;
   console.log(weather);
}
getWeather();
select.onchange = getWeather;

// {
//         "id": 2643741,
//         "name": "City of London",
//         "state": "",
//         "country": "GB",
//         "coord": {
//             "lon": -0.09184,
//             "lat": 51.512791
//         }
// },
//     {
//         "id": 5128581,
//         "name": "New York City",
//         "state": "NY",
//         "country": "US",
//         "coord": {
//             "lon": -74.005966,
//             "lat": 40.714272
//         }
//     },
