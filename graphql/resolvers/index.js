const usersResolvers = require('./users');
const productsResolvers = require('./products');

module.exports = {
    Query: {
        ...usersResolvers.Query,
        ...productsResolvers.Query
    },
    Mutation: {
        ...usersResolvers.Mutation,
        ...productsResolvers.Mutation
    }
}