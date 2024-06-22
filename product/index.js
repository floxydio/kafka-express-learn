const express = require('express')
const app = express()
const port = 4500
const { Kafka, Partitioners } = require('kafkajs');
const { connect } = require('./database/database');
const { findProduct, createProduct } = require('./controllers/product_controller');
const bodyParser = require('body-parser');
const { readKafkaLog } = require('./utils/kafka');

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))

connect()

app.get("/product", findProduct)
app.post("/create-product", createProduct)




app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
})
