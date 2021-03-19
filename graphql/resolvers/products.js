const Product = require('../../Models/Product');
const { validateProductDataInput } = require('../../utils/productValidators');
const checkAuth = require('../../utils/check-auth');
const { UserInputError } = require('apollo-server');
const escapeStringRegex = require('escape-regex-string');

getError = (description, data) => {
    throw new UserInputError(description, { data });
};

module.exports = {
    Query: {
        async getProducts() {
            try {
                const products = await Product.find().sort({ title: 1 });
                return products;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getProductByCode(_, { code }) {
            try {
                const product = await Product.findOne({ code });
                return product;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getProductByBarCode(_, { barcode }) {
            try {
                const product = await Product.findOne({ barcode });
                return product;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getProductByTitle(_, { title }) {
            try {
                const product = await Product.findOne({ title })
                return product;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getProductsFilteredByTitle(_, { title }) {
            const $regex = escapeStringRegex(title);
            try {
                const products = await Product
                .find({ title: { $regex } });
                return products;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async addProduct(_, { registerProductDataInput: { title, producer, price, code, barcode } }, context){
            const { errors, valid } = validateProductDataInput(title, producer, price, code, barcode);
            if(!valid){
                getError('Errors', { errors });
            }

            const product = await Product.findOne({ code });
            if(product){
                errors.general = 'Product already exists. If you need try to update it.';
                getError(errors.general, { errors });
            }
            const user = checkAuth(context);
            const newProduct = new Product({
                title, producer, price, code, barcode, createdAt: new Date().toISOString()
            });

            const res = await newProduct.save();

            return {
                ...res._doc, id: res._id
            };
        },
        async deleteProduct(_, { code }, context){
            const errors = {};
            const user = checkAuth(context);

            const product = await Product.findByIdAndDelete({ code });
            if(!product){
                errors.general = 'Product does not exist';
                getError(errors.general, { errors });
            };

            return product;
        }
    }
}
