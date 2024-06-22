const { Sequelize } = require("sequelize")

const sequelize = new Sequelize('shopkafka', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
})

async function connect() {
    try {
        await sequelize.authenticate()
        console.log('Connection has been established successfully.')
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }
}

module.exports = {
    connect,
    sequelize
}