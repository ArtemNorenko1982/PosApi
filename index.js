const { ApolloServer } = require('apollo-server');
const { connect } = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

const { CONNECTION_STRING } = require('./appconfig');

const server = new ApolloServer({
    typeDefs, resolvers
});

connect(CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`DB was connected successfuly`);
        return server.listen({ port: 15000 })
    })
    .then(res => {
        console.log(`Server running at ${res.url}`);
    });

