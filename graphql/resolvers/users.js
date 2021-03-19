const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { 
    validateUserDataInput, 
    validateLoginInput,
    validateUserEmailInput } = require('../../utils/userValidators');
const { SECRET_KEY } = require('../../appconfig')
const User = require('../../Models/User');

generateToken = (user) => {
    return jwt.sign({
        id: user.id,
        email: user.email,
        userName: user.userName
    }, SECRET_KEY, { expiresIn: '1h' })
};

getError = (description, data) => {
    throw new UserInputError(description, { data });
};

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find();
                return users;
            } catch (error) {
                throw new Error(error);
            }
        },
        async getUser(_, { email }) {
            try {
                const user = await User.findOne({ email });
                return user;
            } catch (error) {
                throw new Error(error);
            }
        }
    },
    Mutation: {
        async registerUser(_, { registerUserInput: { userName, password, confirmPassword, email } }, context, info) {
            const { errors, valid } = validateUserDataInput(userName, password, confirmPassword, email);
            if (!valid) {
                getError('Errors', { errors });
            }

            const user = await User.findOne({ email });

            if (user) {
                getError('User mail is taken', {
                    errors: {
                        email: 'This use email is taken'
                    }
                })
            }

            password = await bcrypt.hash(password, 12);
            const newUser = new User({
                userName, password, email, createdAt: new Date().toISOString()
            });

            const res = await newUser.save();
            const token = generateToken(res);

            return {
                ...res._doc, id: res._id, token
            }
        },
        async login(_, { userName, password }) {
            const { errors, valid } = validateLoginInput(userName, password);
            if (!valid) {
                getError('Errors', { errors })
            }

            const user = await User.findOne({ userName });
            if (!user) {
                errors.general = 'User does not exist';
                getError(errors.general, { errors });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                errors.general = 'Wrong user credentials';
                getError(errors.general, { errors });
            }

            const token = generateToken(user);
            return {
                ...user._doc, id: user._id, token
            }
        },
        async deleteUser(_, { email }) {
            const { errors, valid } = validateUserEmailInput(email);
            if (!valid) {
                getError('Errors', { errors })
            }
            const user = await User.findOneAndDelete({ email });
            if (!user) {
                errors.general = 'User does not exist';
                getError(errors.general, { errors });
            }
            return user;
        },
        async changeUserPassword(_, { userName, password, confirmPassword, email }) {
            const { errors, valid } = validateUserDataInput(userName, password, confirmPassword, email);
            if (!valid) {
                throw getError('Errors', { errors });
            }

            const user = await User.findOne({ email });

            if (!user) {
                errors.general = 'User does not exist';
                getError(errors.general, { errors });
            }

            //const user = await User.findOneAndUpdate({ email })
            return user;
        }
    }
}
