module.exports = { // resolvers are functions that return data for the schema
    Query: {
        getUsers: () => {
            const users = [
                {
                    username: 'John Doe',
                    email: 'john@something.com'
                },
                {
                    username: 'Jane Doe',
                    email: 'jane@email.com'
                }
        
        ];   
        return users;
        }
    },
}