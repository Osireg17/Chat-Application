const userResolver = require('./users');
const messageResolver = require('./message');

module.exports = {
    Message: {
        createdAt: (parent) => parent.createdAt.toISOString() //parent is forwarded from the previous resolver 
    },
    Query: {
        ...userResolver.Query,
        ...messageResolver.Query,
    },
    Mutation: {
        ...userResolver.Mutation,
        ...messageResolver.Mutation,
    },
}; // This is the resolver object that will be passed to the ApolloServer