const { sequelize } = require("../database/database");
const { Sequelize, DataTypes } = require('sequelize');

const product = sequelize.define('product', {
    productId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'product_id',
    },
    name: {
        type: DataTypes.STRING,
    },
    price: {
        type: DataTypes.STRING,
    },
    quantity: {
        type: DataTypes.INTEGER,
    },
    description: {
        type: DataTypes.TEXT,
    },
    location: {
        type: DataTypes.STRING,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at',
    },
}, {
    sequelize,
    timestamps: false,
    tableName: 'product',
})

module.exports = product;