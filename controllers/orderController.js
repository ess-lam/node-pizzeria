const Order = require("../models/order")

exports.list = async (req, res) => {
  // res.send("list of orders")
  try {
    const orders = await Order
      .find()
      .populate('items.pizza')

    res.status(201).json(orders)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

exports.details = async (req, res) => {
  // res.send("details of an individual order id: "+req.params.id)
  try {
    const order = await Order
      .findById(req.params.id)
      .populate('items.pizza')

    res.status(201).json(order)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

}