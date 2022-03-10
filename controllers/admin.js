const models = require("../models/shop-models");
const admin = models.admin;
const shopItems = models.shopItems;
const mongoose = require("mongoose");
const bcrypt= require("bcrypt");

const addShopItem = async (req, res) => {
    try{
        const { name, password, email, shopItem } = req.body;

        const adminCheck = admin.findOne({"name": name, "email": email, "password": password});
        console.log(adminCheck);
        const newShopItem = new shopItems({
            "title": shopItem.title,
            "image": shopItem.image,
            "price": shopItem.price,
            "description": shopItem.description,
            "availableCount": shopItem.availableCount,
            "category": shopItem.category,
            "admin": mongoose.Types.ObjectId(adminCheck._id)
        });

        newShopItem.save();
    } catch(err) {
        console.log(err);
        res.status(422).json("could not find admin");
    }
};

const filterShopItems = async(req, res) => {
    try{
        const { title, price, category } = req.query;

        if(title) {
            const items = await shopItems.find({$regex: title});
            res.json(items);
        } else if(price) {
            const items = await shopItems.find({"price": price}); //güzelleştir
            console.log(items);
            res.json(items);
        } else if(category) {
            const items = await shopItems.find({"category": category});
            res.json(items);
        }
    } catch(err) {
        console.log(err);
        res.status(422).json("could not find item");
    }
};

const updateShopItem = async(req, res) => {
    const { title, image, price, description, availableCount, category } = req.body;

    await shopItems.updateOne({_id: req.params.id}, {$set: {"title": title, "image": image, "price": price, "description": description, "availableCount": availableCount, "category": category}});
};

const removeShopItem = async(req, res) => {
    await shopItems.deleteOne({_id: req.params.id});
};


module.exports = {
    addShopItem,
    filterShopItems,
    updateShopItem,
    removeShopItem,
    adminSignIn

};

