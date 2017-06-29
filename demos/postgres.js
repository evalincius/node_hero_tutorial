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


// connection using created pool
pool.connect(function(err, client, done) {
    if(err){
        return console.error('error fetching client from pool', err)
    }
    client.query('SELECT $1::varchar AS my_firts_query', ['node hero'], function (err, result){
        done()
        if(err){
            return console.error('error happened during query', err)
        }
        console.log(result.rows[0])
        //process.exit(0)
    })
})


module.exports.pool = pool

// pool.end() pool shutdown
