require('dotenv').config();

const Order = require("./models/order")
const Pizza = require("./models/pizza")
const pizzasArr = require("./example-pizzas.json")
// const pizzas = []

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
  
async function main() {
  console.log("Debug: About to connect");
  await mongoose.connect(mongoDB);
  console.log("Debug: Should be connected?");

  // await createPizzas();
  await createOrders();
 
  // await deleteAll();

  console.log("Debug: Closing mongoose");
  mongoose.connection.close();
}

/**
 * creation functions
 *
 */

async function pizzaCreate(index, name, price) {
  const pizza = new Pizza({ name: name, price: price});
  await pizza.save();
  pizzas[index] = pizza;
  console.log(`Added pizza: ${name}`);
}

async function orderCreate(orderItems) {
  const order = new Order({ 
    items: orderItems
  });
  try {
    await order.save();
    console.log(`Added order: ${order._id}`);
  } catch (error) {
    console.log(error.message)
  }
}

/** 
 * implementation functions
 * 
 */

async function createPizzas() {
  console.log("adding pizzas") 
  // adding data manualy
  // await Promise.all([
  //   pizzaCreate(0, 'Cheese', 4),
  //   pizzaCreate(1, 'Veggie', 8)
  // ])

  // adding data from a json file
  try {
    await Pizza.insertMany(pizzasArr);
    
  } catch (error) {
    console.log(error.message)
  }
}

async function createOrders() {
  console.log("adding orders") 

  await Pizza.find().then(
    async (pizzas) => {
      await Promise.all([
        orderCreate([
          {pizza: pizzas[2], quantity: 4},
          {pizza: pizzas[1], quantity: 1},
        ]),
        orderCreate([
          {pizza: pizzas[0], quantity: 8},
          {pizza: pizzas[3], quantity: 3},
        ]),
        orderCreate([
          {pizza: pizzas[4], quantity: 6},
          {pizza: pizzas[2], quantity: 1},
          {pizza: pizzas[1], quantity: 2},
        ])
      ])
    }
  )
}

async function deleteAll() {
  try {
    const allOrders = await Order.deleteMany()
    console.log("all orders were deleted")
  } catch (error) {
    console.log(error.message)
    return
  }

  try {
    const allPizzas = await Pizza.deleteMany()
    console.log("all pizzas were deleted")
  } catch (error) {
    console.log(error.message)
  }
}