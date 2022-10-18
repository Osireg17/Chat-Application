const {User, Message} = require('../models/');
const {UserInputError, AuthenticationError} = require('apollo-server-express');  
const {Op} = require('sequelize');

module.exports = {
    Query:{
        getMessages: async (parent, {from}, {user}) => {
            try{
                if(!user) throw new AuthenticationError('Unauthenticated');
                const otherUser = await User.findOne({where: {username: from}});
                if(!otherUser) throw new UserInputError('User not found');

                const usernames = [user.username, otherUser.username];

                const messages = await Message.findAll({
                    where: {
                        from: {[Op.in]: usernames},
                        to: {[Op.in]: usernames}
                    },
                    order: [['createdAt', 'DESC']]
            })
            return messages; // returns them as a JSON object
            }
            catch(err){
                console.log(err);
                throw err;
            }
        },
    },
        sendMessage: async (_, {to, content}, {user}) => {
            try{
                if(!user) throw new AuthenticationError('Unauthenticated');
                const recipient = await User.findOne({where: {username: to}}); //I am looking for the user that I am sending the message to within the database

                if (!recipient) {
                    throw new UserInputError('User not found');
                } else if (recipient.username === user.username) {
                    throw new UserInputError('You cannot message yourself');
                }
                
                if (content.trim() === '') throw new UserInputError('Message is empty');

                const message =  await Message.create({
                    from: user.username,
                    to,
                    content
                })
            }catch(err){
                console.log(err);
                throw err;
            }
        }
    }