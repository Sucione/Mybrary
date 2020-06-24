if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
};

const express = require("express");
const app = express();
const expressLayouts = require('express-ejs-layouts');
const path = require("path");
const viewPath = path.join(__dirname , "./views");
const mongoose = require('mongoose');
const db = mongoose.connection;
const bodyParser = require("body-parser");

const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');

app.set('view engine', 'ejs');
app.set('views', viewPath);
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: false}));

app.use('/', indexRouter);
app.use('/authors', authorRouter);

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));

app.listen(process.env.PORT || 5000);