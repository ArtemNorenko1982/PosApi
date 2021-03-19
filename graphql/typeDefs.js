const { gql } = require('apollo-server');

module.exports = gql`
    type User{
        id: ID!,
        userName: String!,
        password: String!,
        email: String!,
        createdAt: String!,
        token: String!
    }

    type Product{
        id: ID,
        title: String!,
        producer: String!,
        price: String!,
        code: String!,
        barcode: String!,
        createdAt: String!
    }

    input RegisterUserInput{
        userName: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    input RegisterProductDataInput {
        title: String!,
        producer: String!,
        price: String!,
        code: String!,
        barcode: String!
    }

    type Query{
        getUsers: [User],
        getUser(email: String!): User
        getProducts: [Product]
        getProductByCode(code: String!): Product
        getProductByBarCode(code: String!): Product
        getProductByTitle(title: String!): Product
        getProductsFilteredByTitle(title: String!): [Product]
    }

    type Mutation{
        registerUser(registerUserInput: RegisterUserInput): User!
        login(userName: String!, password: String!): User!
        deleteUser(email: String!): User!
        changeUserPassword(userName: String!, password: String!, confirmPassword: String!, email: String!): User!

        addProduct(registerProductDataInput: RegisterProductDataInput): Product
        deleteProduct(productCode: String!): Product
    }
`;