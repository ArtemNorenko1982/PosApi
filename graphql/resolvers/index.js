const usersResolvers = require('./users');
const productsResolvers = require('./product');

module.exports = {
    Query: {
        ...usersResolvers.Query, ...productsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation
    }
}