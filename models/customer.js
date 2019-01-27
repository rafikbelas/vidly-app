const mongoose = require('mongoose');
const Joi = require('Joi');

const Customer = mongoose.model('Customer', new mongoose.Schema({
    isGold: { 
        type: Boolean, 
        default: false },
    name: { 
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    phone: { 
        type: String,
        required: true,
        minlength: 7,
        maxlength: 15
    }
}));

function validateCustomer(customer) {
    const schema = {
        name: Joi.string().required().min(3).max(30),
        phone: Joi.string().required().min(7).max(15),
        isGold: Joi.boolean()
    };
    
    return Joi.validate(customer, schema);
}

exports.Customer = Customer;
exports.validate = validateCustomer;