var unirest = require("unirest");
const colors = require('colors/safe');
const color = require('colors');
const translate = require('translate-google')


const getLugarLatLng = (lugar) => {
    var req = unirest("GET", "https://community-open-weather-map.p.rapidapi.com/weather");

    req.query({
        "units": "%22metric%22",
        "q": `${lugar}`
    });

    req.headers({
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "035a51811cmsh09ec4a5bd7ab3ddp166996jsne4f099e304c4",
        "useQueryString": true
    });


    req.end(async function(res) {
        if (res.error) {
            console.log(colors.red('No se han podido encontrar los datos solicitados '));
        }

        let weatherMain = res.body.weather[0].main
        let weatherDescription = res.body.weather[0].description
        let wind = res.body.wind.speed

        await translate(weatherMain, { to: 'es' }).then(res => {
            weatherMain = res
        })
        await translate(weatherDescription, { to: 'es' }).then(res => {
            weatherDescription = res
        })

        console.log('********************************************'.rainbow, `Datos climatológicos de ${lugar}`, '*********************************'.rainbow);
        console.log(`Ahora en ${lugar} esta ${weatherMain} mas concretamente ${weatherDescription}`);
        console.log(`Actualmente hay un viento de ${wind} km/h`);
        console.log(`**************************************************************************************************************`.rainbow);



    });

}

module.exports = {
    getLugarLatLng
}