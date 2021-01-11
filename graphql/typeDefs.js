const { gql } = require('apollo-server');

module.exports = gql`
    type User{
        id: ID!,
        userName: String!,
        password: String!,
        email: String!,
        createdAt: String!,
        passwordHash: String!
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

    input RegisterInput{
        userName: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    type Query{
        getUsers: [User],
        getProducts: [Product]
    }

    type Mutation{
        register(registerInput: RegisterInput): User!
    }
`;