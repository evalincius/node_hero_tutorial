const express = require('express')
const path = require('path')
const exphbs = require('express-handlebars')
// const pool = require('./postgres')


var bodyParser = require('body-parser')
var app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutDir: path.join(__dirname, 'views/layouts')
}))

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (request, response) => {
    response.render('home', {
        name: 'John'
    })
})





const pg = require('pg')
const conString = 'postgres://evalincius:@localhost/node_hero'

const pool = new pg.Pool({
    user: 'evalincius',
    host: 'localhost',
    database: 'node_hero',
    password: '',
    port: 5432,
})
// new way, available since 6.0.0:


// // connection using created pool
// pool.connect(function(err, client, done) {
//     if(err){
//         return console.error('error fetching client from pool', err)
//     }
//     client.query('SELECT $1::varchar AS my_firts_query', ['node hero'], function (err, result){
//         done()
//         if(err){
//             return console.error('error happened during query', err)
//         }
//         console.log(result.rows[0])
//         process.exit(0)
//     })
// })

app.post('/users', function(req, res, next){
    const user = req.body

    pool.connect(function (err, client, done){
        if(err){
            // pass the error to the express error handler
            return next(err)
        }
        client.query('INSERT INTO users (name, age) VALUES ($1, $2);', [user.name, user.age], function (err, result){
            done()//this done callback signals the pg driver that the connection can be closed or returned to the connection pool

            if (err) {
                // pass the error to the express error handler
                return next(err)
            }
        })
    })
})

app.get('/users', function (req, res, next) {
    pool.connect(function (err, client, done) {
        if (err) {
            // pass the error to the express error handler
            return next(err)
        }
        client.query('SELECT name, age FROM users;', [], function (err, result) {
            done()

            if (err) {
                // pass the error to the express error handler
                return next(err)
            }

            res.json(result.rows)
        })
    })
})

app.listen(3000)
