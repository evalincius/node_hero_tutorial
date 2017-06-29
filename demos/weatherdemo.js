const express = require('express')
const rp = require('request-promise')
const exphbs = require('express-handlebars')
const path = require('path')


const app = express()

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutDir: path.join(path.resolve("."), 'views/layouts')
}))
app.set('view engine', '.hbs')
app.set('views', path.join(path.resolve("."), 'views'))

app.get('/:city', (req, res) => {
    rp({
        uri: 'http://apidev.accuweather.com/locations/v1/search',
        qs:{
            q: req.params.city,
            apikey: 'hoArfRosT1215'
        },
        json: true
    })
        .then((data) => {
            res.render('./layouts/main', data)
        })
        .catch((err) => {
            console.log(err)
            res.render('./layouts/error', {
                body: err
            })
        })

    console.log(req.params.city)
})

app.listen(3000)