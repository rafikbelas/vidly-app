const mongoose = require('mongoose');
const Joi = require('Joi');
const express = require('express');
const router = express.Router();

const customerSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
        minlength: 7,
        maxlength: 15
    }
});

const Customer = mongoose.model('Customer', customerSchema);

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/', async (req, res) => {
    // Validate customers
    const { error } = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    // Save customer    
    let customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });

    customer = await Customer.save(customer);
    // Return customer
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    if(!customer) return res.status(404).send('No customer with this ID');
    res.send(customer);
});

router.delete('/:id', (res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
    if(!customer) return res.status(404).send('No customer with this ID');
    res.send(customer);
});

function validateGenre(customer) {
    const schema = {
        isGold: Joi.boolean(),
        name: Joi.string().required().minlength(3).maxlength(30),
        phone: Joi.number().required().minlength(7).maxlength(15)
    };
    
    return Joi.validate(customer, schema);
}

module.exports = router;