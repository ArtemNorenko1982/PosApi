const { model, Schema } = require('mongoose');

const productSchema = new Schema({
    title: String,
    producer: String,
    price: Number,
    code: String,
    barcode: String,
    createdAt: String
});

module.exports = model('Product', productSchema);
