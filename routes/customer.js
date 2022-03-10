const express = require("express");
const router = express.Router();

const customerController = require("../controllers/customer");

router.get("/filter", customerController.customerFilterItem);
//router.post("/", customerController.addCustomer);
router.get("/item/:title", customerController.customerSearch);
router.put("/", customerController.addToCart);
router.put("/checkout", customerController.checkoutOrder);
router.get("/item", customerController.getInfo);
//router.post("/signup", customerController.customerSingUp);
//router.post("/signin", customerController.customerSignIn);
//router.get("/signout", customerController.customerSignOut);
//router.get("/authenticated", customerController.customerAuthenticated);
//router.get("/orders", customerController.customerFetchOrders);
//router.update("/profile", customerController.customerProfile);
//router.update("/cart", customerController.customerCart);

module.exports = router;