require('dotenv').config();

const express = require('express') 
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require("./routes/index")
const pizzaRouter = require("./routes/pizza")
const orderRouter = require("./routes/order")

const app = express();

// Set up mongoose connection
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/api/pizzas', pizzaRouter);
app.use('/api/orders', orderRouter);

app.listen('3000')
