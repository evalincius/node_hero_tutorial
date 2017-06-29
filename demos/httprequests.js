const request = require('request-promise')

const options = {
    method: 'GET',
    uri: 'https://risingstack.com'
}

request(options)
    .then(function (response) {
        
    })
    .catch(function (err) {

    })