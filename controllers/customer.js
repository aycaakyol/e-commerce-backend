const models = require("../models/shop-models");
const admin = models.admin;
const shopItems = models.shopItems;
const Customer = models.Customer;
const CustomerCart = models.CustomerCart;
const CustomerOrder = models.CustomerOrder;
const mongoose = require("mongoose");

const customerFilterItem = async(req, res) => {  //try catch e koy
    const { category, minPrice, maxPrice } = req.query;
    const items = await shopItems.find({category: {$in: category}, price: {$gte: minPrice, $lte: maxPrice}});
    res.status(200).json(items);
};

/*const addCustomer = async(req, res) => {
    try{
    const {name, email, password, address, number, customerCart, customerOrder} = req.body;
    const newCustomer = new Customer({
        name,
        email,
        password, 
        address, 
        number, 
        customerCart, 
        customerOrder
    });

    newCustomer.save();

    res.status(200).json(newCustomer);
    } catch(err) {
        res.status(422).json(err);
    }
};*/

const addToCart = async(req, res) => {
    try {
        const { customerID, itemID, quantity } = req.body;

        const customer = await Customer.findOne({_id: customerID});
        const item = await shopItems.findOne({_id: itemID});
        
        if(quantity > item.availableCount) {
            res.status(422).json("error");
        } else {
            await Customer.updateOne({_id: customerID}, {$push: {"customerCart.items": item, "customerCart.count": quantity}});
            res.status(200).json(item);
        }
    } catch(err) {
        res.status(422).json(err);
    }
};

const customerSearch = async(req, res) => {   //TODO
    try {
        const { title } = req.params;
        const items = await shopItems.find({title: {$regex: title}});
        res.status(200).json(items);
    } catch(err) {
        res.status(422).json("error");
    }
};

const getInfo = async(req, res) => { 
    try{
        const { id } = req.body;
        const item = await shopItems.find({_id: id});
        res.status(200).json(item);
    } catch(err) {
        res.status(422).json("error");
    }
};

const checkoutOrder = async(req, res) => {
    try{
        const { customerID } = req.body;
        const customer = await Customer.findOne({_id: customerID});
        customer.customerOrder.items = customer.customerCart.items;
        customer.customerOrder.count = customer.customerCart.count;
        let customerBill = 0;
        for(let i = 0; i < customer.customerOrder.items.length; i++) {
            customerBill += customer.customerOrder.items[i].price * customer.customerOrder.count[i];
            const item = await shopItems.findOne({_id: customer.customerOrder.items[i]._id});
            item.availableCount -= customer.customerOrder.count[i];
            customer.customerOrder.items[i].availableCount -= customer.customerOrder.count[i];
            await item.save();
        }
        customer.customerOrder.bill = customerBill;
        customer.customerCart.items = [];
        customer.customerCart.count = [];
        await customer.save();
        res.status(200).json(customer);
    } catch(err) {
        res.status(422).json(err);
    }
};

const customerSingUp = async(req, res) => {

};

module.exports = {
    customerFilterItem,
    customerSearch,
    getInfo,
    addToCart,
    //addCustomer,
    checkoutOrder,
    customerSingUp
};