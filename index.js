'use strict'
const express = require('express')
const cors = require('cors')
const app = express()
const cryptoJS = require('crypto-js')

app.use(express.urlencoded({extended: true}))
app.use(express.json()) // To Parse the incoming requests with JSON
app.use(cors())

app.get('/', async (req, res) => {
    console.log('$GET -> /')
    res.send('Hello World! Working great!')
})

const passphase = '931776028f4b4e0a7fb974226387134c'; // Utilized by both Mobile and BE to decypher key

app.post('/decrypt', async (req, res) => {
    const body = req.body
    var bytes  = cryptoJS.AES.decrypt(body.data, passphase);
    var originalText = bytes.toString(cryptoJS.enc.Utf8);

    console.log(originalText) // original message
    
    res.send({
        data: originalText
    })
    
})

app.listen(8081, () => {
    console.log(`example app listening at http://localhost:8081`)
})