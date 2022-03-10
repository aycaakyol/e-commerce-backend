const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin");

router.post("/", adminController.addShopItem);
router.get("/filter", adminController.filterShopItems);
router.put("/:id", adminController.updateShopItem);
router.delete("/:id", adminController.removeShopItem);
router.post("/signin", adminController.adminSignIn);
//router.get("/singout", adminController.adminSignOut);
//router.get("/authenticated", adminController.adminAuthenticated);
//router.get("/orders", adminController.fetchOrders);
//router.get("/customers", adminController.fetchCustomers);
//router.post("/new-admin", adminController.createAdmin);

module.exports = router;