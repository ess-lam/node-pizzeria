const Pizza = require("../models/pizza")

exports.list = async (req, res) => {
  // res.send("list of pizzas")
  try {
    const pizzas = await Pizza.find();
    res.status(201).json(pizzas)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

}

