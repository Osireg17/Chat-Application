const {User} = require('../models/');
const bcrypt = require('bcryptjs');

module.exports = { // resolvers are functions that return data for the schema
    Query: {
        getUsers: async () => {
            try {
                const users = await User.findAll();
                return users;
            } catch (err) {
                console.log(err);
            }

        }
    },

    Mutation: {
        register: async (_, args) => {
            const {username, email, password, confirmPassword} = args;
            try {
                // TODO: Validate user data
                const user = await User.create({
                    username, email, password
                });
                
                return user;
            } catch (err) {
                console.log(err);
            }
        }
        }
    }
