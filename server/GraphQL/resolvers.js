const {User} = require('../models/');
const {UserInputError, AuthenticationError} = require('apollo-server-express');  
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../config/env.json');
const {Op} = require('sequelize');

module.exports = { // resolvers are functions that return data for the schema
    Query: {
        getUsers: async (_, __, context) => {
            try {
                let user
                if(context.req && context.req.headers.authorization) {
                const token = context.req.headers.authorization.split('Bearer ')[1]; //This just gets the token from the header
                jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
                    if(err) {
                        throw new AuthenticationError('Unauthenticated');
                    }
                    user = decodedToken;
                })
            }

                const users = await User.findAll({
                    where: {username: {[Op.ne]: user.username}} // This is a sequelize operator that says not equal to the current user
                });
                return users;
            } catch (err) {
                console.log(err);
                throw err;
            }
        },
        login: async(_, args) => {
            const {username, password} = args;
            let errors = {};
            try {
                if (username.trim() === '') errors.username = 'Username must not be empty';
                if (password === '') errors.password = 'Password must not be empty';

                if (Object.keys(errors).length > 0) { // This catches the errors before they are sent to the database
                    throw new UserInputError('Bad input', {errors});
                }

                const user = await User.findOne({where: {username}});
                if(!user) {
                    errors.general = 'User not found';
                    throw new UserInputError('User not found', {errors});
                }
                const match = await bcrypt.compare(password, user.password);
                if(!match) {
                    errors.general = 'Wrong credentials';
                    throw new AuthenticationError('Wrong credentials', {errors});
                }

                const token = jwt.sign({
                    username
                }, JWT_SECRET, {expiresIn: '1h'});

                return{
                    ...user.toJSON(), // change the user object to a JSON object
                    createdAt: user.createdAt.toISOString(),
                    token // change the createdAt object to a string
                }
            } catch (err) {
                console.log(err);
                throw err
                
            }
        }

    },

    Mutation: {
        register: async (_, args) => {
            let {username, email, password, confirmPassword} = args;
            let errors = {}
            try {
                // Validate user data
                if (email.trim() === '') {
                    errors.email = 'Email must not be empty';
                }
                if (username.trim() === '') {
                    errors.username = 'Username must not be empty';
                }
                if (password.trim() === '') {
                    errors.password = 'Password must not be empty';
                }
                if (confirmPassword.trim() === '') {
                    errors.confirmPassword = 'Confirm password must not be empty';
                }
                if (password !== confirmPassword) {
                    errors.confirmPassword = 'Passwords must match';
                }

                // const userByUsername = await User.findOne({
                //     where: {
                //         username // checks for the username in the database
                //     }
                // });
                // const userByEmail = await User.findOne({
                //     where: {
                //         email
                //     }
                // });

                // if (userByUsername) errors.username = 'Username is taken'; //checking if the username is already taken
                // if (userByEmail) errors.email = 'Email is taken'; //checking if the email is already taken

                if (Object.keys(errors).length > 0) { // So I stored the errors in an object and if the object has any keys, then it means there are errors, and you return them back to the client
                    throw errors;
                }

                password = await bcrypt.hash(password, 12);
                // TODO: Validate user data
                const user = await User.create({
                    username, email, password
                });
                
                return user;
            } catch (err) {
                console.log(err);
                if (err.name === 'SequelizeUniqueConstraintError') {
                    err.errors.foreach(e => (errors[e.path] = `${e.path} is already taken`));
                } else if (err.name === 'SequelizeValidationError') {
                    err.errors.forEach(e => (errors[e.path] = `Valid ${e.path} is required`));
                }
                throw new UserInputError('Bad input', {errors});
            }
        }
        }
    }
