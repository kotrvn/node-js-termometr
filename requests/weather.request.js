const rp = require('request-promise');

module.exports = async function(city) {
    if(!city) {
        throw new Error('Имя города не может быть пустым');
    }

    const KEY = 'b1851c911be4bcd68401e11e0cbcd1a4';
    const uri = 'http://api.openweathermap.org/data/2.5/weather';

    const options = {
        uri,
        qs: {
            appid: KEY,
            q: city,
            units: 'imperial'

        },
        json: true

    }

    try {
        const data = await rp(options);
        const celsius = ((data.main.temp -32) * 5/9).toFixed(1);


        return {
            weather: `${data.name}: ${celsius}`,
            error: null
        }
    } catch (error) {
        return {
            weather: null,
            error: error.error.message
        }

    }

    
}