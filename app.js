const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').load();
const app = express();
const port = 3000;

mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//require routes
const mvPdiaRoutes = require('./routes/movie-pedia.routes');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', mvPdiaRoutes);

app.listen(port, () => {
  console.log(`Server is up and running on port:${port}`);
});

module.exports = app;