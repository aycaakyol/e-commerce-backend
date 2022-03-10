const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Admin = new mongoose.Schema({
    "name": {
        type: String,
        required: true,
        maxLength: 20
    },

    "password": {    //password güzelleştir
        type: String,
        required: true,
        minLength: 8
    },

    "email": {
        type: String,
        required: true
    }
});

const ShopItem = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 5,
    },

    image: {
        type: String,   
        required: true
    },

    price: {
        type: Number,
        required:true
    },

    description: {
        type: String,
        required: true //minlength
    },

    availableCount: {
        type: Number,
        required: true
    },

    category: {
        type: [String],
        required: true
    },

    admin: [{ type: Schema.Types.ObjectId, ref: 'Admin' }]
});

const customerCart = new mongoose.Schema({      //güzelleştir
    items: {
        type: [ShopItem],
        default: []
    },

    count: {
        type: [Number],
        default: []
    }
});

const customerOrder = new mongoose.Schema({
    items: {
        type: [ShopItem],
        default: []
    },

    count: {
        type: [Number],
        default: []
    },

    bill: {
        type: Number, 
        required: true
    }
});

const customer = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    password: {  
        type: String,
        required: true,
        minlength: 8
    },

    address: {                   //güzelleştir
        type: String,
        required: true
    },

    number: {
        type: Number,
        required: true,
        length: 10
    },

    customerCart: {
        type: customerCart,
        required: true
    },

    customerOrder: {
        type: customerOrder,
        required: true
    }
});

const admin = mongoose.model("admin", Admin, "admins");
const shopItems = mongoose.model("shopItem", ShopItem, "shop-items");
const CustomerCart = mongoose.model("customerCart", customerCart, "customers");
const CustomerOrder = mongoose.model("customerOrder", customerOrder, "customers");
const Customer = mongoose.model("customer", customer, "customers");

module.exports = {
    admin,
    shopItems, 
    CustomerCart,
    CustomerOrder,
    Customer
};