const Product = require("../models/product_model");
const { sendToKafka } = require("../utils/kafka");


async function findProduct(req, res) {
    let product = await Product.findAll();
    if (product === null) {
        res.status(404).send("Product not found");
    } else {
        res.status(200).json({
            status: 200,
            data: product,
            message: "Product found successfully",
        });
    }
}

async function createProduct(req, res) {
    let productCreate = await Product.create({
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        description: req.body.description,
        location: req.body.location,
    })

    if (productCreate === null) {
        res.status(400).send("Product not created");
    } else {
        let dataSendToKafka = {
            product: productCreate,
            date_created: new Date(),
            time_stamp: new Date().getTime(),
        }
        sendToKafka(JSON.stringify(dataSendToKafka));
        res.status(201).json({
            status: 201,
            data: productCreate,
            message: "Product created successfully",
        });
    }
}

module.exports = {
    findProduct,
    createProduct
}