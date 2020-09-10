const lugar = require('./lugar/lugar')


const argv = require('yargs').options({
    direccion: {
        alias: 'd',
        desc: 'descripcion de la ciudad para obtener el clima',
        default: true
    }
}).argv

lugar.getLugarLatLng(argv.direccion)