const {ApolloServer} = require('apollo-server');
const {sequelize} = require('./models');


const resolvers = require('./GraphQL/resolvers');
const typeDefs = require('./GraphQL/typeDefs');


const server = new ApolloServer({typeDefs, resolvers}); // We have the types, and resolvers which are functions that return data for the schema

server.listen().then(({url}) => {
    console.log(`Server is running on ${url}`);

    sequelize.authenticate().then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.log(err);
    })
});
