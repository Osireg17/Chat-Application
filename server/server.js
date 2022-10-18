const {ApolloServer} = require('apollo-server');
const {sequelize} = require('./models');


const resolvers = require('./resolvers');
const typeDefs = require('./GraphQL/typeDefs');

const context = require('./middleware/context');



const server = new ApolloServer({
    typeDefs, 
    resolvers,
    context: context, // This is the context middleware
}); // We have the types, and resolvers which are functions that return data for the schema

server.listen().then(({url}) => {
    console.log(`Server is running on ${url}`);

    sequelize.authenticate().then(() => {
        console.log('Database connected');
    }).catch(err => {
        console.log(err);
    })
});
