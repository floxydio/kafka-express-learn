const express = require('express')
const app = express()
const port = 4000
const { Kafka, Partitioners } = require("kafkajs")

const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['localhost:29092'],
    connectionTimeout: 3000,
    requestTimeout: 30000,
    retry: {
        initialRetryTime: 300,
        retries: 10
    }
})

const consumer = kafka.consumer({ groupId: 'test-group' })

async function consume() {
    await consumer.connect()
    await consumer.subscribe({ topic: 'product_trx' })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                value: JSON.parse(message.value.toString()),
            })
        },
    })
}

consume()


app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
}).on('error', (err) => {
    console.error(err)
})
