const { Kafka, Partitioners } = require('kafkajs');

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

const producer = kafka.producer({
    createPartitioner: Partitioners.LegacyPartitioner,
})

async function sendToKafka(message) {
    await producer.connect()
    await producer.send({
        topic: 'product_trx',
        messages: [
            { value: message },
        ],
    })
}


module.exports = {
    sendToKafka,
}