const express = require('express');
const app = require('express')();

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const hbs = require('hbs');
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');
const productRouter = require('./router/productRouter');
const orderRouter = require('./router/orderRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser())

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// app.use('/user', require('./routes/userRouter'));
app.use('/', userRouter);
app.use('/', productRouter);
app.use('/', orderRouter);


// app.get('/Inicio', (req, res) => {
//     res.render('Inicio');
// });
 
module.exports = app;  