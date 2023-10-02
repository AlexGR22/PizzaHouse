const express = require('express');
const app = require('express')();

require('dotenv').config();
const path = require('path');
const cors = require('cors');
const hbs = require('hbs');
const userRouter = require('./router/userRouter');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, '/views'));

hbs.registerPartials(path.join(__dirname, '/views/partials'));

// app.use('/user', require('./routes/userRouter'));
app.use('/', userRouter);


app.get('/inicio', (req, res) => {
    res.render('inicio');
});

module.exports = app;