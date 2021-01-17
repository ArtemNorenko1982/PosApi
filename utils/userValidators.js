const emailRegEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
const { isStringNull } = require('./nullValidator')

module.exports.validateUserDataInput = (
    userName,
    password,
    confirmPassword,
    email,
) => {
    const errors = {};
    if(isStringNull(userName)){
        errors.userName = 'Username should not be empty';
    }

    if(isStringNull(email)){
        errors.email = 'Email should not be empty';
    } else if(!email.match(emailRegEx)){
        errors.email = 'Email must be valid email address';
    }
    
    if(isStringNull(password)){
        errors.password = 'Password should not be empty';
    } else if(password !== confirmPassword){
        errors.confirmPassword = 'Password should match';
    }

    return {
        errors, valid: Object.keys(errors).length < 1
    }
}

module.exports.validateLoginInput = (userName, password) => {
    const errors = {};
    if(isStringNull(userName)){
        errors.userName = 'Username should not be empty';
    }

    if(isStringNull(password)){
        errors.password = 'Password should not be empty';
    }

    return {
        errors, valid: Object.keys(errors).length < 1
    }
}

module.exports.validateUserEmailInput = (email) => {
    const errors = {};
    if(isStringNull(email)){
        errors.email = 'Email should not be empty';
    } else if(!email.match(emailRegEx)){
        errors.email = 'Email must be valid email address';
    }

    return {
        errors, valid: Object.keys(errors).length < 1
    }
}
