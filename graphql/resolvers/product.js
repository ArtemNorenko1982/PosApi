const { Product } = require('../../Models/Product');

module.exports = {
    Query: {
        async getProducts() {
            try {
                const products = await Product.find();
                return products;
            } catch (error) {
                throw new Error(error);
            }
        }
    }
}
