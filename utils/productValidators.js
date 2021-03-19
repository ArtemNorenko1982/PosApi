const { isStringNull } = require('./nullValidator');
const codeRegEx = /^[0-9]\w{0,5}$/;
const barcodeRegEx = /^[0-9]\w{4,13}$/;

module.exports.validateProductDataInput = (
    title,
    producer,
    price,
    code, 
    barcode
) => {
    const errors = {};

    if(isStringNull(title)){
        errors.title = 'Produc title should not be empty';
    }

    if(isStringNull(producer)){
        errors.producer = 'Product producer should not be empty';
    }

    if(isStringNull(price)){
        errors.price = 'Product price should not be empty';
    }

    if(isStringNull(code)){
        errors.code = 'Produc code should not be empty';
    }

    if(!code.match(codeRegEx)){
        errors.code = 'Produc code should be more (or equal) than 1 and less then 6 digits';
    }

    if(!barcode.match(barcodeRegEx)){
        errors.barcode = 'Produc barcode should be more (or equal) than 5 and less then 14 digits';
    }    

    return {
        errors, valid: Object.keys(errors).length < 1
    }
}