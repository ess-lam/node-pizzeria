const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController')

router.get("/", orderController.list);

router.get("/:id", orderController.details);

module.exports = router;