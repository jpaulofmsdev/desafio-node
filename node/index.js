const express = require('express')
const app = express()
const port = 3000
const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'root',
    database: 'desafio_node',
    port: process.env.DB_PORT || 3306
};
const mysql = require('mysql')
const connection = mysql.createConnection(config)



app.get('/', (req,res) => {
    const sql = `INSERT INTO people(name) values('João Paulo Ferreira')`
    connection.query(sql, (error) => {
        if(error) console.error('Error: ', error)
    })
    connection.query('SELECT * FROM people', (error, results, fields) => {
        const result = results.reduce((prev, curr) => `${prev}<br>-${curr.name}`, '')
        res.send(`<h1>Full Cycle</h1>${result}`)
    })
})

app.listen(port, ()=> {
    console.log('Rodando na porta ' + port)
})