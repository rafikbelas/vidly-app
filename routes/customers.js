const { Customer, validate } = require('../models/customer'); // .Customer // .validate
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const customers = await Customer.find();
    res.send(customers);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = new Customer({
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    });
    
    await customer.save(customer);
    
    res.send(customer);
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id, 
    {
        isGold: req.body.isGold,
        name: req.body.name,
        phone: req.body.phone
    }, { new: true });

    if(!customer) return res.status(404).send('No customer with this ID');
    
    res.send(customer);
});

router.delete('/:id', async (req, res) => {
    const customer = await Customer.findByIdAndRemove(req.params.id);
   
    if(!customer) return res.status(404).send('No customer with this ID');
    
    res.send(customer);
});

router.get('/:id', async (req, res) => {
    // TODO might fail if id is not of type ObjectId
    // Exception is:  CastError: Cast to ObjectId failed for value
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(404).send('No customer with this ID');
    res.send(customer);
});

module.exports = router;