const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require('../../appconfig')
const User = require('../../Models/User');

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async register(_, { registerInput: { userName, password, email } }, context, info) {
            // 
            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                userName, password, email, createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = jwt.sign({
                id: res.id,
                email: res.email,
                userName: res.userName
            }, SECRET_KEY, { expiresIn: '1h' });

            return {
                ...res._doc, id: res._id, token
            }
        }
    }
}
